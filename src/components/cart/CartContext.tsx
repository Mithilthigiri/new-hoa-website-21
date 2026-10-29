import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { shopifyClient } from "@/lib/shopify";
import {
  ADD_TO_CART,
  CREATE_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "@/lib/shopify-queries";
import { extractCartLineIds, parseCartLineIds, type ShopifyCart } from "@/lib/shopify-cart-lines";

export type CartItem = {
  id: string;
  handle: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  imageAlt: string;
  size: string;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  shopifyCartId: string | null;
  checkoutUrl: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "hoa-cart";
const SHOPIFY_CART_KEY = "hoa-shopify-cart-id";
const SHOPIFY_CHECKOUT_KEY = "hoa-shopify-checkout-url";
const SHOPIFY_LINES_KEY = "hoa-shopify-cart-lines";

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item["id"] === "string" &&
    typeof item["title"] === "string" &&
    typeof item["size"] === "string" &&
    typeof item["price"] === "number" &&
    typeof item["quantity"] === "number"
  );
}

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [shopifyCartId, setShopifyCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const shopifyCartIdRef = useRef<string | null>(null);
  const shopifyLineIdsRef = useRef<Record<string, string>>({});
  const syncQueueRef = useRef<Promise<void>>(Promise.resolve());

  // Read persisted cart after hydration so SSR and client markup match.
  useEffect(() => {
    setItems(readStoredCart());
    try {
      const storedCartId = window.localStorage.getItem(SHOPIFY_CART_KEY);
      const storedCheckoutUrl = window.localStorage.getItem(SHOPIFY_CHECKOUT_KEY);
      if (storedCartId) {
        shopifyCartIdRef.current = storedCartId;
        setShopifyCartId(storedCartId);
      }
      if (storedCheckoutUrl) setCheckoutUrl(storedCheckoutUrl);
      shopifyLineIdsRef.current = parseCartLineIds(window.localStorage.getItem(SHOPIFY_LINES_KEY));
    } catch {
      /* storage unavailable — Shopify cart starts fresh */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  }, [items, hydrated]);

  // Run Shopify writes one at a time so an add can never race a quantity edit.
  const enqueue = useCallback((task: () => Promise<void>) => {
    const previous = syncQueueRef.current;
    const run = previous.then(
      () => task(),
      () => task(),
    );
    syncQueueRef.current = run.catch(() => undefined);
  }, []);

  // Store everything a cart response tells us: id, checkout link, line ids.
  const applyCart = useCallback((cart: ShopifyCart | null | undefined) => {
    if (!cart) return;

    if (typeof cart.id === "string" && cart.id) {
      shopifyCartIdRef.current = cart.id;
      setShopifyCartId(cart.id);
      try {
        window.localStorage.setItem(SHOPIFY_CART_KEY, cart.id);
      } catch {
        /* storage unavailable */
      }
    }

    if (typeof cart.checkoutUrl === "string" && cart.checkoutUrl) {
      setCheckoutUrl(cart.checkoutUrl);
      try {
        window.localStorage.setItem(SHOPIFY_CHECKOUT_KEY, cart.checkoutUrl);
      } catch {
        /* storage unavailable */
      }
    }

    if (cart.lines) {
      const lineIds = extractCartLineIds(cart);
      shopifyLineIdsRef.current = lineIds;
      try {
        window.localStorage.setItem(SHOPIFY_LINES_KEY, JSON.stringify(lineIds));
      } catch {
        /* storage unavailable */
      }
    }
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      // 1. Update local state as before.
      setItems((current) => {
        const index = current.findIndex((it) => it.id === item.id && it.size === item.size);
        if (index === -1) return [...current, item];
        return current.map((it, i) =>
          i === index ? { ...it, quantity: it.quantity + item.quantity } : it,
        );
      });

      // 2. Sync with Shopify. The local cart keeps working even if this fails.
      enqueue(async () => {
        try {
          const lines = [{ merchandiseId: item.id, quantity: item.quantity }];
          const currentCartId = shopifyCartIdRef.current;
          if (!currentCartId) {
            const { data } = await shopifyClient.request(CREATE_CART, {
              variables: { lines },
            });
            applyCart(data?.cartCreate?.cart);
          } else {
            const { data } = await shopifyClient.request(ADD_TO_CART, {
              variables: { cartId: currentCartId, lines },
            });
            applyCart(data?.cartLinesAdd?.cart);
          }
        } catch (err) {
          console.error("Shopify cart error:", err);
        }
      });
    },
    [applyCart, enqueue],
  );

  const removeItem = useCallback(
    (id: string, size: string) => {
      setItems((current) => current.filter((it) => !(it.id === id && it.size === size)));

      // Look the line id up inside the queue so a pending add resolves first.
      enqueue(async () => {
        const cartId = shopifyCartIdRef.current;
        const lineId = shopifyLineIdsRef.current[id];
        if (!cartId || !lineId) return;
        try {
          const { data } = await shopifyClient.request(REMOVE_FROM_CART, {
            variables: { cartId, lineIds: [lineId] },
          });
          applyCart(data?.cartLinesRemove?.cart);
        } catch (err) {
          console.error("Shopify cart remove error:", err);
        }
      });
    },
    [applyCart, enqueue],
  );

  const updateQuantity = useCallback(
    (id: string, size: string, quantity: number) => {
      const next = Math.max(0, Math.floor(quantity));

      setItems((current) =>
        next <= 0
          ? current.filter((it) => !(it.id === id && it.size === size))
          : current.map((it) =>
              it.id === id && it.size === size ? { ...it, quantity: next } : it,
            ),
      );

      enqueue(async () => {
        const cartId = shopifyCartIdRef.current;
        const lineId = shopifyLineIdsRef.current[id];
        if (!cartId || !lineId) return;
        try {
          if (next <= 0) {
            const { data } = await shopifyClient.request(REMOVE_FROM_CART, {
              variables: { cartId, lineIds: [lineId] },
            });
            applyCart(data?.cartLinesRemove?.cart);
          } else {
            const { data } = await shopifyClient.request(UPDATE_CART_QUANTITY, {
              variables: { cartId, lines: [{ id: lineId, quantity: next }] },
            });
            applyCart(data?.cartLinesUpdate?.cart);
          }
        } catch (err) {
          console.error("Shopify cart quantity error:", err);
        }
      });
    },
    [applyCart, enqueue],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    shopifyCartIdRef.current = null;
    shopifyLineIdsRef.current = {};
    setShopifyCartId(null);
    setCheckoutUrl(null);
    try {
      window.localStorage.removeItem(SHOPIFY_CART_KEY);
      window.localStorage.removeItem(SHOPIFY_CHECKOUT_KEY);
      window.localStorage.removeItem(SHOPIFY_LINES_KEY);
    } catch {
      /* storage unavailable */
    }
  }, []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);
    const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    return {
      items,
      isOpen,
      totalItems,
      subtotal,
      shopifyCartId,
      checkoutUrl,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    };
  }, [
    items,
    isOpen,
    shopifyCartId,
    checkoutUrl,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
