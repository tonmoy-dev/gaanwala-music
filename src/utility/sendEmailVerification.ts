import { resendMail } from "@/lib/resendMail";
import EmailVerification from "../../emails/emailVerification";
import { ApiResponse } from "@/types/apiResponse";

export async function sendEmailVerification(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // sending mail using resend library
    const result = await resendMail.emails.send({
      from: "gaanwalamusic@resend.dev",
      to: email,
      subject: "Gaanwala Music | Email Verification Code",
      react: EmailVerification({ username, validationCode: verifyCode }),
    });

    if (result.error) {
      return {
        success: false,
        message: "Failed to send verification email",
      };
    }
    return {
      success: true,
      message: "Verification email send successfully",
    };
  } catch (error) {
    console.log("Error in sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
