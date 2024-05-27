import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { JSONResponse } from "@/utility/createResponse";
import { z } from "zod";

// create query schema
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

// Get request for checking username
export async function GET(request: Request) {
  // connecting to DB
  await dbConnect();

  try {
    // taking query params from requested URL
    const { searchParams } = new URL(request.url); // /api/check-username?username=rxdevs
    const queryParams = {
      username: searchParams.get("username"),
    };

    // validate username with zod
    const validationResult = UsernameQuerySchema.safeParse(queryParams);
    if (!validationResult.success) {
      // validation is failed, finding error format for username
      const usernameErrors =
        validationResult.error.format().username?._errors || [];
      return JSONResponse(false, "Username is not valid", 400);
    }

    // if validation is successful then check username that exists on DB or not
    const { username } = validationResult.data;
    // check username is already verified
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return JSONResponse(false, "Username is not available", 200);
    }

    // at last username is unique then
    return JSONResponse(true, "Username is available", 200);
  } catch (error) {
    console.error("Getting error on checking username:", error);
    return JSONResponse(false, "Errors on checking username", 500);
  }
}
