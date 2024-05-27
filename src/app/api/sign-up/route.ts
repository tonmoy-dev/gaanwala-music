import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import generateOTP from "@/utility/generateOTP";
import { sendEmailVerification } from "@/utility/sendEmailVerification";
import bcrypt from "bcrypt";
import { JSONResponse } from "@/utility/createResponse";

// POST request
export async function POST(request: Request) {
  // connect to DB
  await dbConnect();

  // sign up
  try {
    const { username, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = generateOTP();
    const expiryTime = new Date(Date.now() + 3600000);

    // check existing user by username
    // user must be a verified user
    const existingUserVerifiedByUserName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUserName) {
      return JSONResponse(false, "Username is already taken.", 400);
      //  Response.json(
      //   {
      //     success: false,
      //     message: "Username is already taken.",
      //   },
      //   { status: 400 }
      // );
    }
    // check existing user by  email
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    if (existingUserByEmail) {
      // user email exists and it's verified
      if (existingUserByEmail.isVerified) {
        return JSONResponse(false, "User already exists with this email", 400);
        // return Response.json(
        //   {
        //     success: false,
        //     message: "User already exists with this email",
        //   },
        //   { status: 400 }
        // );
      } else {
        // user email exists but not verified
        // save the updated user
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = expiryTime;

        await existingUserByEmail.save();
      }
    } else {
      // Registering new user

      // create a new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryTime,
        isVerified: false,
        isPremiumMember: false,
      });
      await newUser.save();
    }
    //  send verification email
    const emailResponse = await sendEmailVerification(
      email,
      username,
      verifyCode
    );
    // if email sending is failed
    if (!emailResponse.success) {
      return JSONResponse(false, emailResponse.message, 500);
      // return Response.json(
      //   {
      //     success: false,
      //     message: emailResponse.message,
      //   },
      //   { status: 500 }
      // );
    }

    // after successful registration
    return JSONResponse(
      true,
      "User registered successfully. Please verify your email.",
      201
    );
    // return Response.json(
    //   {
    //     success: true,
    //     message: "User registered successfully. Please verify your email.",
    //   },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error on registering user", error);
    // send response for error
    return JSONResponse(false, "Error on registering user", 500);
    // return Response.json(
    //   {
    //     success: false,
    //     message: "Error on registering user",
    //   },
    //   {
    //     status: 500,
    //   }
    // );
  }
}
