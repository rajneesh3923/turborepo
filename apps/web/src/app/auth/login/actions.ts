"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData): Promise<{ error?: string }> {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      console.log("Login error:", error);
      // throw new Error("Login failed");
      return { error: error?.message };
    }

    // Only navigate after the login operation completes
    console.log("Login successful");
    revalidatePath("/", "layout");
    redirect("/");
  } catch (err) {
    console.error("Login failed:", err);
  }

  return {};
}

//   signup code

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        role: "User",
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  console.log("Signup Successful");
  revalidatePath("/", "layout");
  redirect("/");
}
