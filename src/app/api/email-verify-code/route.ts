import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { JSONResponse } from "@/utility/createResponse";

// create POST request
export async function POST(request: Request) {
  // connected to DB
  await dbConnect();

  try {
    // get username & verify code from request
    const { username, code } = await request.json();

    // decoded URI params
    const decodedUsername = decodeURIComponent(username);
    // get user from DB
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) return JSONResponse(false, "User not found", 404);

    // check if the verify code is correct & not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid) return JSONResponse(false, "Incorrect verify code", 400);
    else if (!isCodeNotExpired)
      return JSONResponse(
        false,
        "Verify code has expired, please sign up again to get a new code",
        400
      );
    else {
      // isCodeValid & isCodeNotExpired is true
      // update the user's verification status
      user.isVerified = true;
      // update the user to DB
      await user.save();

      return JSONResponse(true, "User account verified successfully", 200);
    }
  } catch (error) {
    console.error("Getting errors while verifying user:", error);
    return JSONResponse(false, "Error verifying user", 500);
  }
}
