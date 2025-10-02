//Step 7 Creating Authentication Guard
/*
 This component guards the main application routes by checking if the user is authenticated.
 If the user is not authenticated, it redirects them to the login page.
*/
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
  //we use useEffect to mounted the function
  useEffect(() => {
    //fetch the session from supabase
    const fetchSession = async () => {
      /*
        to track the user if its authenticate, we use getUser() and
        its destructuring data & errors
      */
      const { data, error } = await supabase.auth.getUser();
      //check if the user is not authenticated then its stays in main page
      if (!data.user || error) {
        return;
      }
      const emailCheck = data?.user?.email?.endsWith("@doctor.com");
      //check if the user is doctor or patient then redirect to their dashboard
      //just like in the previous step before it also has the id to retrieve its data
      if (emailCheck) {
        router.replace(`/auth/user-doctor/${data?.user?.id}`);
      } else {
        router.replace(`/auth/user-patient/${data?.user?.id}`);
      }
    };
    fetchSession();
  }, [router, supabase]);
  //we set the loading screen up to 2 seconds (just for animations)
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
  //after animation ends
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
