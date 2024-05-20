import { Resend } from "resend";

// create resend mail
export const resendMail = new Resend(process.env.RESEND_API_KEY);
