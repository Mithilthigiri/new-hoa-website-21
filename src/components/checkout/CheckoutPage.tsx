import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { formatPrice } from "@/components/home/products-data";
import { useCart } from "@/components/cart/useCart";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

function validateForm(values: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (phoneDigits.length !== 10) {
    errors.phone = "Phone must be 10 digits";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.address1.trim()) {
    errors.address1 = "Address is required";
  }

  if (!values.city.trim()) {
    errors.city = "City is required";
  }

  if (!values.state.trim()) {
    errors.state = "State is required";
  }

  if (!values.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(values.pincode)) {
    errors.pincode = "Pincode must be 6 digits";
  }

  return errors;
}

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const currency = items[0]?.currency ?? "INR";
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const visibleErrors = useMemo<FormErrors>(() => {
    const liveErrors: FormErrors = {};
    const fields: (keyof FormData)[] = [
      "fullName",
      "phone",
      "email",
      "address1",
      "city",
      "state",
      "pincode",
    ];
    for (const field of fields) {
      const error = errors[field];
      if (error && (touched[field] || errors[field])) {
        liveErrors[field] = error;
      }
    }
    return liveErrors;
  }, [errors, touched]);

  const handlePlaceOrder = () => {
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      address1: true,
      city: true,
      state: true,
      pincode: true,
    });

    if (Object.keys(validationErrors).length === 0) {
      clearCart();
      void navigate({ to: "/order-confirmation" });
    }
  };

  const inputClass =
    "h-12 w-full border-0 border-b-2 border-[#DDD5C0] bg-[#FAF6EE] px-1 font-sans text-[0.8125rem] text-[#1A0F0A] outline-none transition-colors duration-200 placeholder:text-[#7A6855]/50 focus:border-[#2C1810]";

  const labelClass =
    "mb-1.5 block font-sans text-[0.625rem] uppercase tracking-[0.1em] text-[#7A6855]";

  const errorClass = "mt-1.5 font-sans text-[0.625rem] text-[#B85C38]";

  return (
    <div className="min-h-screen bg-[#F5EFE0] px-[var(--page-gutter)] py-16">
      <div className="mx-auto max-w-[960px]">
        {/* Page header */}
        <header className="mb-8 text-center">
          <Link
            to="/"
            className="font-display inline-block text-base font-light tracking-[0.15em] text-[#1A0F0A]"
          >
            HOUSE OF AIRA
          </Link>
          <div className="mt-5 h-px w-full bg-[#C9A84C]" />
          <p className="font-sans mt-3 text-[0.5625rem] uppercase tracking-[0.1em] text-[#7A6855]">
            <span className="text-[#1A0F0A]">1. Information</span>
            <span className="mx-2 text-[#DDD5C0]">→</span>
            <span className="text-[#DDD5C0]">2. Review</span>
            <span className="mx-2 text-[#DDD5C0]">→</span>
            <span className="text-[#DDD5C0]">3. Confirm</span>
          </p>
        </header>

        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-start">
          {/* Left column: form */}
          <div className="flex-1 lg:w-[58%]">
            <p className="font-sans mb-5 text-[0.625rem] uppercase tracking-[0.15em] text-[#B85C38]">
              Delivery Information
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={inputClass}
                  autoComplete="name"
                />
                {visibleErrors.fullName ? (
                  <p className={errorClass}>{visibleErrors.fullName}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass}
                  autoComplete="tel"
                  maxLength={15}
                />
                {visibleErrors.phone ? <p className={errorClass}>{visibleErrors.phone}</p> : null}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass}
                  autoComplete="email"
                />
                {visibleErrors.email ? <p className={errorClass}>{visibleErrors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="address1" className={labelClass}>
                  Address Line 1
                </label>
                <input
                  id="address1"
                  type="text"
                  value={form.address1}
                  onChange={(e) => updateField("address1", e.target.value)}
                  className={inputClass}
                  autoComplete="address-line1"
                />
                {visibleErrors.address1 ? (
                  <p className={errorClass}>{visibleErrors.address1}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="address2" className={labelClass}>
                  Address Line 2 (optional)
                </label>
                <input
                  id="address2"
                  type="text"
                  value={form.address2}
                  onChange={(e) => updateField("address2", e.target.value)}
                  className={inputClass}
                  autoComplete="address-line2"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className={inputClass}
                    autoComplete="address-level2"
                  />
                  {visibleErrors.city ? <p className={errorClass}>{visibleErrors.city}</p> : null}
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <select
                    id="state"
                    value={form.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    className={`${inputClass} cursor-pointer appearance-none`}
                    autoComplete="address-level1"
                  >
                    <option value="">Select state</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {visibleErrors.state ? <p className={errorClass}>{visibleErrors.state}</p> : null}
                </div>
              </div>

              <div className="sm:w-1/2">
                <label htmlFor="pincode" className={labelClass}>
                  Pincode
                </label>
                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  value={form.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                  className={inputClass}
                  autoComplete="postal-code"
                  maxLength={6}
                />
                {visibleErrors.pincode ? (
                  <p className={errorClass}>{visibleErrors.pincode}</p>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="font-sans mt-8 h-14 w-full bg-[#2C1810] text-center text-[0.6875rem] uppercase tracking-[0.15em] text-[#FAF6EE] transition-colors duration-200 hover:bg-[#1A0F0A]"
            >
              Place Order
            </button>

            <p className="font-sans mt-3 text-center text-[0.5625rem] leading-relaxed text-[#7A6855]">
              By placing your order you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Right column: order review */}
          <aside className="lg:sticky lg:top-[100px] lg:w-[42%]">
            <div className="border border-[#DDD5C0] bg-[#FAF6EE] p-6">
              <p className="font-sans mb-4 text-[0.625rem] uppercase tracking-[0.15em] text-[#7A6855]">
                Your Order
              </p>

              {items.length === 0 ? (
                <p className="font-editorial py-4 text-center text-sm italic text-[#7A6855]">
                  Your bag is empty.
                </p>
              ) : (
                <>
                  <ul>
                    {items.map((item) => (
                      <li key={`${item.id}-${item.size}`} className="mb-4 flex gap-3">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          className="h-[74px] w-[56px] flex-shrink-0 rounded-[2px] object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <p className="font-sans text-[0.6875rem] font-medium text-[#1A0F0A]">
                            {item.title}
                          </p>
                          <p className="font-sans mt-0.5 text-[0.5625rem] uppercase tracking-[0.1em] text-[#7A6855]">
                            Size {item.size}
                          </p>
                          <p className="font-sans mt-0.5 text-[0.5625rem] text-[#7A6855]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-editorial text-[0.8125rem] italic text-[#1A0F0A]">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="my-4 h-px w-full bg-[#DDD5C0]" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">Subtotal</span>
                      <span className="font-editorial text-sm italic text-[#1A0F0A]">
                        {formatPrice(subtotal, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">Shipping</span>
                      <span className="font-sans text-[0.6875rem] text-[#1A0F0A]">
                        {subtotal >= 2999 ? "FREE" : "Calculated at checkout"}
                      </span>
                    </div>
                  </div>

                  <div className="my-4 h-px w-full bg-[#DDD5C0]" />

                  <div className="flex justify-between">
                    <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#1A0F0A]">
                      Total
                    </span>
                    <span className="font-sans text-[0.8125rem] font-semibold text-[#1A0F0A]">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>

                  <p className="font-sans mt-3 text-center text-[0.5625rem] text-[#7A6855]">
                    ({totalItems} {totalItems === 1 ? "item" : "items"})
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
