//Step 3 Redirect
/*
    The purpose for this one is when the user got authenticated (JWTS) and get its value of id
    it will also send it to the [id] folder or what we called dynamic route in this page
    you can now access the dashboard of the patient by using the id for query
*/
"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
export default function Redirect() {
    //useEffect will run once when the component is mounted
    //it will redirect to "/auth/user-patient/${id}/dashboard" by using router.push
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    useEffect(() => {
        router.push(`/auth/user-patient/${id}/dashboard`);
    }, [router]);
    return null;
}