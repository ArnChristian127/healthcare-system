"use client";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
export default function Authentication() {
    const supabase = createClient();
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        await supabase.from('doctor_user').update({ status: false }).eq('id', id).single();
        router.push('/main');
    }
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}