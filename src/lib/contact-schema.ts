import { z } from "zod";
export const serviceOptions = ["Landing Page", "E-commerce Website", "Business Website", "WordPress Development", "Website Redesign", "Website Maintenance", "Other"] as const;
export const budgetOptions = ["Under ৳10,000", "৳10,000–৳25,000", "৳25,000–৳50,000", "৳50,000+", "Not Sure"] as const;
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Please use 100 characters or fewer."),
  email: z.email("Please enter a valid email address.").max(254).trim(),
  phone: z.string().trim().max(30, "Please use 30 characters or fewer.").refine(value => !value || /^[+\d\s().-]{6,30}$/.test(value), "Please enter a valid phone number."),
  businessName: z.string().trim().max(150, "Please use 150 characters or fewer."),
  service: z.enum(serviceOptions, { error: "Please choose a service." }),
  budget: z.enum(budgetOptions, { error: "Please choose a budget range." }),
  description: z.string().trim().min(20, "Please share at least 20 characters about your project.").max(5000, "Please keep your description under 5,000 characters."),
  website: z.string().max(0, "Unable to accept this inquiry."),
  startedAt: z.number().int().positive(),
});
export type ContactValues = z.infer<typeof contactSchema>;
