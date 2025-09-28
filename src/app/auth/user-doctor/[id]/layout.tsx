"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = createClient();
    const params = useParams();
    const id = params.id;
    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase.from("doctor_user").select("*").eq("id", id).single();
            document.title = `HealthCare - ${data?.username}`;
        }
        fetch();
    }, []);
    useEffect(() => {
        const fetch = async () => {
            await supabase.from('doctor_user').update({ status: true }).eq('id', id).single();
        }
        fetch();
    }, []);
    return (
        <div className="font-bold">
            {children}
        </div>
    )
}