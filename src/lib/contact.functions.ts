import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please add a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more").max(2000),
});

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;

export const submitContactEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactEnquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ? data.phone : null,
      subject: data.subject ? data.subject : null,
      message: data.message,
    });

    if (error) {
      console.error("contact_enquiries insert failed", error.code, error.message);
      return { ok: false as const };
    }

    return { ok: true as const };
  });
