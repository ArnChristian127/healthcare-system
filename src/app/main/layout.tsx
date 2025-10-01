"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import ModalAuthentication from "@/components/modals/ModalAuthentication";
import Footer from "@/components/footer/FooterHome";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function MainApp({ children }: { children: React.ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || error) {
        return;
      }
      const emailCheck = data?.user?.email?.endsWith("@doctor.com");
      if (emailCheck) {
        router.replace(`/auth/user-doctor/${data?.user?.id}`);
      } else {
        router.replace(`/auth/user-patient/${data?.user?.id}`);
      }
    };
    fetchSession();
  }, [router, supabase]);
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
    <div className={`text-sm mt-15 text-gray-700`}>
      {isOpenModal && <ModalAuthentication onClick={setIsOpenModal} />}
      <Navbar
        setOpenModal={setIsOpenModal}
        links={[
          { href: "/main/", label: "HOME" },
          { href: "/main/about", label: "ABOUT" },
          { href: "/main/gallery", label: "GALLERY" },
          { href: "/main/contact", label: "CONTACT" },
        ]}
      />
      {children}
      <Footer />
    </div>
  );
}
