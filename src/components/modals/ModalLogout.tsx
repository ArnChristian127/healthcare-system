import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type ModalLogoutProps = {
  onClose: (v: boolean) => void;
};
export default function ModalLogout({ onClose }: ModalLogoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    setIsLoading(true);
    const { data } = await supabase.auth.getUser();
    const doctor = data?.user?.email?.endsWith("@doctor.com");
    if (doctor) {
      await supabase
        .from("doctor_user")
        .update({
          status: false,
        })
        .eq("id", data?.user?.id);
    }
    console.log(data);
    onClose(false);
    setIsLoading(false);
    await supabase.auth.signOut();
    router.push("/main");
  };
  return (
    <>
      <div className="inset-0 bg-black opacity-50 fixed z-60" />
      <div className="inset-0 fixed z-60 flex justify-center items-center px-3 text-sm md:text-base">
        {isLoading ? (
          <div className="bg-white p-5 rounded-lg">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-lg p-5 w-120">
            <h1 className="text-md md:text-lg lg:text-xl font-semibold text-teal-400">
              Sign Out Account
            </h1>
            <p className="mt-2 text-gray-600">
              Are you sure you want to Sign Out? Once you logout you need to
              Sign In again.
            </p>
            <div className="mt-3 flex justify-between items-center gap-5 font-medium">
              <button
                onClick={handleLogout}
                className="bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white transition duration-300 p-2 rounded-md cursor-pointer w-full"
              >
                Sign Out
              </button>
              <button
                onClick={() => onClose(false)}
                className="bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white transition duration-300 p-2 rounded-md cursor-pointer w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
