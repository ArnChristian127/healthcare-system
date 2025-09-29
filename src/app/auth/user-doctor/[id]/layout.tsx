"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || error) {
        router.replace(`/main`);
        console.log(error);
        return;
      }
    };
    fetchSession();
  }, [router, supabase]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("doctor_user")
        .select("*")
        .eq("id", id)
        .single();
      document.title = `HealthCare - Dr.${data?.username}`;
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      await supabase
        .from("doctor_user")
        .update({ status: true })
        .eq("id", id)
        .single();
    };
    fetch();
  }, []);
  return <div className="font-bold">{children}</div>;
}
