import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { contactEnquirySchema, submitContactEnquiry } from "@/lib/contact.functions";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "mt-2 w-full border-b border-[#1A0F0A]/20 bg-transparent pb-2 font-sans text-[14px] text-[#1A0F0A] outline-none transition-colors focus:border-[#C9A84C]";
const labelClass = "font-sans text-[10px] uppercase tracking-[0.2em] text-[#7A6855]";

export function ContactPage() {
  const send = useServerFn(submitContactEnquiry);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = contactEnquirySchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      const result = await send({ data: parsed.data });
      if (!result.ok) throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or message us on WhatsApp.");
    }
  }

  const infoItems = [
    {
      icon: <MapPin size={22} color="#B85C38" />,
      label: "OUR STUDIO",
      value: "Chennai, Tamil Nadu",
      href: undefined,
    },
    {
      icon: <MessageCircle size={22} color="#B85C38" />,
      label: "WHATSAPP",
      value: "Chat with us",
      href: "https://api.whatsapp.com/send?phone=919384488692",
    },
    {
      icon: <Clock size={22} color="#B85C38" />,
      label: "RESPONSE TIME",
      value: "Within a few hours",
      href: undefined,
    },
  ];

  return (
    <div className="bg-[#F5EFE0]">
      <section className="border-b border-[#DDD5C0] px-6 pt-12 pb-12 text-center lg:pt-20">
        <div className="mx-auto w-full max-w-[680px]">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]">Contact</p>
          <h1 className="mt-4 font-display text-[clamp(36px,5vw,64px)] leading-[1.1] font-light text-[#1A0F0A]">
            Write to the House
          </h1>
          <span aria-hidden="true" className="mx-auto my-6 block h-px w-12 bg-[#C9A84C]" />
          <p className="mx-auto max-w-[520px] font-editorial text-[18px] leading-[1.75] text-[#7A6855] italic">
            Styling advice, sizing, bespoke orders or press — send us a note and our client care
            team will reply personally.
          </p>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-[#EDE4D0] px-6 py-12 lg:px-12">
        <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {infoItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              {item.icon}
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#7A6855]">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 font-sans text-[13px] text-[#1A0F0A]"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 font-sans text-[13px] text-[#1A0F0A]">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F5EFE0] px-6 py-20 lg:px-12">
        <div className="mx-auto grid w-full max-w-[100rem] gap-16 lg:grid-cols-[45%_55%]">
          <div>
            <h2 className="font-display text-[28px] font-light text-[#1A0F0A]">Client care</h2>
            <p className="mt-4 font-sans text-[14px] leading-[1.8] text-[#7A6855]">
              We reply to every enquiry, usually within one business day.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=919384488692"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-fit border-b border-[#B85C38]/40 pb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#B85C38]"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  maxLength={100}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  maxLength={255}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-phone">
                  Phone (optional)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  maxLength={30}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-subject">
                  Subject (optional)
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  maxLength={120}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={2000}
                required
                className={`${fieldClass} resize-none`}
              />
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle size={40} color="#2D5A3D" />
                <h3 className="mt-6 font-display text-[28px] font-light text-[#1A0F0A]">
                  Message received.
                </h3>
                <p className="mt-3 font-editorial text-[16px] italic leading-[1.75] text-[#7A6855]">
                  We&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-[52px] w-full bg-[#2C1810] font-sans text-[11px] uppercase tracking-[0.15em] text-[#FAF6EE] transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Enquiry"}
                </button>

                {status === "error" && error ? (
                  <p aria-live="polite" className="mt-4 font-sans text-[13px] text-[#B85C38]">
                    {error}
                  </p>
                ) : null}
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
