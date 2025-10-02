//Step 3 Redirect
//the purpose for this one is instead in "/" as a basic route it redirect to "/main"
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Redirect() {
    //useEffect will run once when the component is mounted
    //it will redirect to "/main" by using router.push
    const router = useRouter();
    useEffect(() => {
        router.push("/main");
    }, [router]);
    return null;
}