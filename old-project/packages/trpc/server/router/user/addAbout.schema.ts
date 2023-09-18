import z from "zod";

const aboutInputVal = z.object({
  about: z
    .string()
    .min(10, "About - Enter at least 10 characters.")
    .max(200, "About - Exceeds maximum characters of 200."),
});

export type AboutInputType = typeof aboutInputVal._type;

export const aboutInput = aboutInputVal;
