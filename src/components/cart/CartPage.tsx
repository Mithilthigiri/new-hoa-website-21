import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/components/home/products-data";
import { useCart } from "./useCart";

const FREE_SHIPPING_THRESHOLD = 2999;

export function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);
  const currency = items[0]?.currency ?? "INR";

  return (
    <div className="min-h-screen bg-[#F5EFE0] px-[var(--page-gutter)] py-16">
      <div className="mx-auto max-w-[900px]">
        {/* Page header */}
        <header className="mb-8">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-[#B85C38]">
            Your Cart
          </p>
          <h1 className="font-display mt-2 text-[2.25rem] font-light leading-tight text-[#1A0F0A] md:text-[2.5rem]">
            Shopping Bag
          </h1>
          <p className="font-editorial mt-1 text-base italic text-[#7A6855]">
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </p>
          <div className="mt-6 h-px w-12 bg-[#C9A84C]" />
        </header>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <ShoppingBag className="size-10 text-[#DDD5C0]" strokeWidth={1.25} />
            <h2 className="font-display mt-5 text-2xl font-light text-[#1A0F0A]">
              Your cart is empty
            </h2>
            <p className="font-editorial mt-3 text-base italic text-[#7A6855]">
              Discover pieces crafted with intention.
            </p>
            <Link
              to="/shop"
              className="font-sans mt-7 inline-block border-b border-[#B85C38]/40 pb-1 text-[0.625rem] uppercase tracking-[0.15em] text-[#B85C38]"
            >
              Shop the collection →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            {/* Left column: item list */}
            <div className="flex-1 lg:w-[60%]">
              <ul>
                {items.map((item) => (
                  <li
                    key={`${item.id}-${item.size}`}
                    className="flex gap-5 border-b border-[#DDD5C0] py-6"
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-[133px] w-[100px] flex-shrink-0 rounded-[2px] object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-sans text-[0.8125rem] font-medium text-[#1A0F0A]">
                          {item.title}
                        </p>
                        <p className="font-sans mt-1 text-[0.625rem] uppercase tracking-[0.12em] text-[#7A6855]">
                          Size {item.size}
                        </p>
                        <p className="font-editorial mt-1.5 text-base italic text-[#1A0F0A]">
                          {formatPrice(item.price, item.currency)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
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
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
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

              <Link
                to="/shop"
                className="font-sans mt-6 inline-block w-fit border-b border-[#7A6855]/30 pb-1 text-[0.625rem] uppercase tracking-[0.12em] text-[#7A6855] transition-colors duration-200 hover:text-[#B85C38]"
              >
                ← Continue shopping
              </Link>
            </div>

            {/* Right column: order summary */}
            <aside className="lg:sticky lg:top-[100px] lg:w-[40%]">
              <div className="border border-[#DDD5C0] bg-[#FAF6EE] p-7">
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.15em] text-[#7A6855]">
                  Order Summary
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">
                      Subtotal
                    </span>
                    <span className="font-editorial text-base italic text-[#1A0F0A]">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">
                      Shipping
                    </span>
                    <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                </div>

                <div className="my-4 h-px w-full bg-[#DDD5C0]" />

                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[#1A0F0A]">
                    Total
                  </span>
                  <span className="font-sans text-[0.8125rem] font-semibold text-[#1A0F0A]">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="font-sans mt-7 flex h-[52px] w-full items-center justify-center bg-[#2C1810] text-center text-[0.6875rem] uppercase tracking-[0.15em] text-[#FAF6EE] transition-colors duration-200 hover:bg-[#1A0F0A]"
                >
                  Proceed to Checkout
                </Link>

                <p className="font-sans mt-3 text-center text-[0.5625rem] text-[#7A6855]">
                  Free shipping on orders above {formatPrice(FREE_SHIPPING_THRESHOLD, currency)}
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
