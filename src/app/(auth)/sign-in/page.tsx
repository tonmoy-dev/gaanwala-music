"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // implement zod in react hook form
  type SignInData = z.infer<typeof signInSchema>;
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // post data on form submit
  const onSubmit = async (data: SignInData) => {
    setIsFormSubmitting(true);
    // sign in using next auth
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    // handling errors
    if (result?.error) {
      setIsFormSubmitting(false);
      toast({
        title: "Sign In Failed",
        description: result.error.replace("Error: ", ""),
        variant: "destructive",
      });
    }
    // checking if sign in is successful
    if (result?.url) {
      setIsFormSubmitting(false);
      // navigate to home
      router.replace("/");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join To Gaanwala Music
          </h1>
          <p className="mb-4">Sign In to start your journey with us.</p>
        </div>
        {/* Sign Up Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/ Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isFormSubmitting}
              className="w-full"
            >
              {isFormSubmitting ? "Please wait" : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not Have any account yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
