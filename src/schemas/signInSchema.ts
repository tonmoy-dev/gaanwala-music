import { z } from "zod";

export const verifySchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

// identifier means username or email
