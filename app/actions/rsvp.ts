"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type RSVPState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitRSVP(
  _prevState: RSVPState,
  formData: FormData
): Promise<RSVPState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const plusOne = formData.get("plus_one") === "on";
  const dietaryRestrictions =
    (formData.get("dietary_restrictions") as string)?.trim() || null;

  if (!name || !email || !phone) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const { count, error: countError } = await supabase
    .from("rsvps")
    .select("*", { count: "exact", head: true });

  if (countError) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  if ((count ?? 0) >= 50) {
    return {
      status: "error",
      message: "We're sorry, RSVPs are now full.",
    };
  }

  const { error: insertError } = await supabase.from("rsvps").insert({
    name,
    email,
    phone,
    plus_one: plusOne,
    dietary_restrictions: dietaryRestrictions,
  });

  if (insertError) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    status: "success",
    message: "You're on the list! We can't wait to celebrate with you.",
  };
}
