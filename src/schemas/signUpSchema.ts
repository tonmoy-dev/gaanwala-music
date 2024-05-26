import { z } from "zod";

// username validation schema
export const usernameValidation = z
  .string()
  .min(4, "Username must be atleast 2 characters")
  .max(10, "Username must be not more than 10 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special characters");

export const emailValidation = z
  .string()
  .email({ message: "Write a valid email address" });

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be atleast 5 characters" })
  .max(12, { message: "Password must be not more than 12 characters" })
  .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,}$/, {
    message:
      "Password must be contains a number, a letter and a special character",
  });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
