//Step 7 Creating Authentication Guard
"use client";
import { FaUserMd, FaHistory, FaMoneyCheck } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { IoBarChartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import NavbarDynamic from "@/components/navbar/NavbarDynamic";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  /*
    its the same thing as the previous one, the only difference
    if the user is not authenticated and accidentally go here, it will eventually
    return to the main page
  */
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
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingScreen />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <NavbarDynamic
        id={id}
        target="patient_user"
        linkList={[
          { href: `dashboard`, label: "Overview", icons: <IoBarChartSharp /> },
          { href: `appointment`, label: "Appointment", icons: <FaUserMd /> },
          { href: `medicalhistory`, label: "Medical History", icons: <FaHistory /> },
          { href: `balance`, label: "Balance", icons: <FaMoneyCheck /> },
        ]}
      />
      <main className="px-6 py-4 mt-10 lg:mt-0 flex-1 lg:h-screen lg:overflow-y-auto">
        <div className="container mx-auto py-5 lg:py-0">{children}</div>
      </main>
    </div>
  );
}
