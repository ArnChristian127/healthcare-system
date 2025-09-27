"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function Authentication() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    useEffect(() => {
        router.push(`/auth/user-patient/${id}/dashboard`);
    }, [router]);
    return null;
}