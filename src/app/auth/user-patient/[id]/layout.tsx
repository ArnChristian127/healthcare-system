"use client";
import { FaUserMd, FaHistory, FaMoneyCheck } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { IoBarChartSharp } from "react-icons/io5";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import DynamicNavigation from "@/components/patient-page/navbar/DynamicNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        .from("patient_user")
        .select("*")
        .eq("id", id)
        .single();
      document.title = `HealthCare - ${data?.username}`;
    };
    fetch();
  }, []);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <DynamicNavigation
        id={id}
        linkList={[
          { href: `dashboard`, label: "Overview", icons: <IoBarChartSharp /> },
          { href: `appointment`, label: "Appointment", icons: <FaUserMd /> },
          { href: `history`, label: "History", icons: <FaHistory /> },
          { href: `balance`, label: "Balance", icons: <FaMoneyCheck /> },
        ]}
      />
      <main className="px-6 py-4 mt-10 lg:mt-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="container mx-auto py-5 lg:py-0">{children}</div>
      </main>
    </div>
  );
}
