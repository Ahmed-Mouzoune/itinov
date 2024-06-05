"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUserService } from "@/services/UserService";
import { configCookie } from "@/lib/api";

const schemaLogin = z.object({
    identifier: z
      .string()
      .min(3, {
        message: "Identifier must have at least 3 or more characters",
      })
      .max(20, {
        message: "Please enter a valid username or email address",
      }),
    password: z
      .string()
      .min(6, {
        message: "Password must have at least 6 or more characters",
      })
      .max(100, {
        message: "Password must be between 6 and 100 characters",
      }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }
  const responseData = await loginUserService(validatedFields.data);
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if ('error' in responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }
  cookies().set("jwt", responseData.jwt, configCookie);
  redirect('/');
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...configCookie, maxAge: 0 });
  redirect("/");
}