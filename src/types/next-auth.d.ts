import "next-auth";
import { DefaultSession } from "next-auth";

// update/ re-define the next-auth library: User,Session,JWT model
declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    username?: string;
  }
}
