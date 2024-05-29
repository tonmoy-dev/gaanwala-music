"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextField from "@/components/utility/text-field";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // debouncing effect while typing username
  const debounced = useDebounceCallback(setUsername, 1000);
  const { toast } = useToast(); // toast message
  const router = useRouter(); // navigating pages

  // implementing zod to react hook form
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // check if the username is unique or not.
    const checkUniqueUsername = async () => {
      setIsCheckingUsername(true);
      setUsernameMsg(""); // reset message
      try {
        // take response from check username route
        const response = await axios.get<ApiResponse>(
          `/api/check-username?username=${username}`
        );
        setUsernameMsg(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMsg(
          axiosError.response?.data.message ?? "Error on checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };
    if (username.length > 4) {
      checkUniqueUsername();
    }

    // clean up
    return () => {
      setUsername("");
    };
  }, [username]);

  // pass data on submit
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsFormSubmitting(true);
    try {
      // post sign up request
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });

      // navigate to verify page
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Error on Sign Up:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      // error message
      let errorMsg = axiosError.response?.data.message ?? "Please Try Again";

      toast({
        title: "Failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md bg-white dark:bg-black my-10">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join To Gaanwala Music
          </h1>
          <p className="mb-4">Sign up to start your journey with us.</p>
        </div>
        {/* Sign Up Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {!isCheckingUsername && usernameMsg && (
                    <p
                      className={`text-sm ${
                        usernameMsg === "Username is available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMsg}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextField name="email" label="Email" control={form.control} />
            <TextField
              name="password"
              label="Password"
              control={form.control}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? "Please wait" : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already Have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
