import { createClient } from "./client";

export async function signUp( username: string, email: string, password: string, address: string, date: string, phonenumber: string) {
    const supabase = createClient();
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });
    const { error: insertError } = await supabase.from("patient_user").insert({
        id: signUpData?.user?.id,
        username,
        email,
        address,
        date_of_birth: date,
        phone_number: phonenumber,
    });
    if (!username) return "Username is required";
    if (!date) return "Date of birth is required";
    if (!address) return "Address is required";
    if (signUpError) return signUpError.message;
    if (insertError) return insertError.message;
    return null;
}