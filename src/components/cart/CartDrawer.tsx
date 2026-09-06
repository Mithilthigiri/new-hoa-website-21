import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/components/home/products-data";
import { useCart } from "./useCart";

export function CartDrawer() {
  const { items, isOpen, subtotal, closeCart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  const currency = items[0]?.currency ?? "INR";

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-[rgba(44,24,16,0.4)] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        aria-label="Your cart"
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        className={`fixed right-0 top-0 bottom-0 z-50 flex w-screen max-w-full flex-col bg-[#F5EFE0] transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0,0.15,1)] sm:w-[420px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-[#DDD5C0] px-6">
          <p className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-[#1A0F0A]">
            Your Cart
          </p>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-[#1A0F0A] transition-colors duration-200 hover:text-[#B85C38]"
          >
            <X className="size-6" strokeWidth={1.25} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <ShoppingBag className="size-8 text-[#DDD5C0]" strokeWidth={1.25} />
              <h2 className="font-display mt-4 text-[1.375rem] font-light text-[#1A0F0A]">
                Your cart is empty
              </h2>
              <p className="font-editorial mt-2 text-[0.9375rem] italic text-[#7A6855]">
                Discover pieces crafted with intention.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="font-sans mt-6 inline-block border-b border-[#B85C38]/40 pb-1 text-[0.625rem] uppercase tracking-[0.15em] text-[#B85C38]"
              >
                Shop the collection →
              </Link>
            </div>
          ) : (
            <ul>
              {items.map((item, index) => (
                <li
                  key={`${item.id}-${item.size}`}
                  className={`flex gap-[14px] ${
                    index === items.length - 1 ? "" : "mb-5 border-b border-[#DDD5C0] pb-5"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-[106px] w-20 flex-shrink-0 rounded-[2px] object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-sans text-xs font-medium text-[#1A0F0A]">{item.title}</p>
                    <p className="font-sans mt-[3px] text-[0.625rem] uppercase tracking-[0.12em] text-[#7A6855]">
                      Size {item.size}
                    </p>
                    <p className="font-editorial mt-1 text-sm italic text-[#1A0F0A]">
                      {formatPrice(item.price, item.currency)}
                    </p>

                    <div className="mt-[10px] flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="font-sans size-6 border border-[#DDD5C0] text-sm text-[#1A0F0A] transition-colors duration-200 hover:border-[#B85C38] hover:text-[#B85C38]"
                      >
                        −
                      </button>
                      <span className="font-sans min-w-5 text-center text-[0.8125rem] text-[#1A0F0A]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="font-sans size-6 border border-[#DDD5C0] text-sm text-[#1A0F0A] transition-colors duration-200 hover:border-[#B85C38] hover:text-[#B85C38]"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id, item.size)}
                        className="font-sans ml-auto text-[0.5625rem] uppercase tracking-[0.12em] text-[#7A6855] transition-colors duration-200 hover:text-[#B85C38]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 ? (
          <footer className="flex-shrink-0 border-t border-[#DDD5C0] px-6 pb-8 pt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.15em] text-[#7A6855]">
                Subtotal
              </span>
              <span className="font-editorial text-base italic text-[#1A0F0A]">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p className="font-sans mt-1.5 text-[0.5625rem] text-[#7A6855]/70">
              Shipping calculated at checkout
            </p>
            <button
              type="button"
              onClick={() => {
                closeCart();
                void navigate({ to: "/checkout" });
              }}
              className="font-sans mt-5 h-[52px] w-full rounded-none bg-[#2C1810] text-[0.6875rem] uppercase tracking-[0.15em] text-[#FAF6EE] transition-colors duration-200 hover:bg-[#1A0F0A]"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={closeCart}
              className="font-sans mt-[14px] block w-full text-center text-[0.5625rem] uppercase tracking-[0.12em] text-[#7A6855] transition-colors duration-200 hover:text-[#B85C38]"
            >
              Continue Shopping →
            </button>
          </footer>
        ) : null}
      </aside>
    </>
  );
}
