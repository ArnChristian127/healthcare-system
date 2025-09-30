"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function Redirect() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    useEffect(() => {
        router.replace(`/auth/user-doctor/${id}/dashboard`);
    }, [router]);
    return null;
}