import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { CiLogout } from "react-icons/ci";
import { BsList } from "react-icons/bs";
import Link from "next/link";
import ModalLogout from "../patient-page/modals/ModalLogout";

type LinkList = {
  href: string;
  label: string;
  icons: any;
};
type DynamicNavigationProps = {
  id: any;
  target: 'patient_user' | 'doctor_user';
  linkList: LinkList[];
};
export default function DynamicNavigation({
  id,
  linkList,
  target,
}: DynamicNavigationProps) {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const fetch = async () => {
    const { data, error } = await supabase
      .from(target)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setUser(data);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      {isModalOpen && <ModalLogout onClose={setIsModalOpen} />}
      <aside className="bg-slate-700 text-white p-4 w-full hidden lg:flex lg:flex-col lg:w-64 rounded-r-2xl">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold">
          Healthcare
        </h2>
        <hr className="border-t border-gray-600 w-full my-3" />
        <ul className="space-y-6 font-semibold">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white text-gray-700 border-2 border-teal-400 rounded-full flex items-center justify-center font-medium">
              {user?.username.toUpperCase().charAt(0)}
            </div>
            <h1 className="font-medium">
              {target === "patient_user" ? user?.username : `Dr. ${user?.username}`}
            </h1>
          </div>
          {linkList.map((link, index) => (
            <li
              key={index}
              className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 cursor-pointer"
            >
              {link.icons}
              <Link
                href={`/auth/${target === 'patient_user' ? 'user-patient' : 'user-doctor'}/${id}/${link.href}`}
                className="block"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-3 border-t border-gray-600">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 font-semibold cursor-pointer"
          >
            <CiLogout />
            Logout
          </button>
        </div>
      </aside>
      <nav className="px-6 py-4 text-white bg-slate-700 lg:hidden fixed top-0 w-full z-50">
        <div className="flex items-center justify-between mx-auto container">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-white text-gray-700 border-2 border-teal-400 rounded-full flex items-center justify-center font-medium">
              {user?.username.toUpperCase().charAt(0)}
            </div>
            <h1 className="font-medium">{user?.username}</h1>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white px-1 py-1 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-sm cursor-pointer transition duration-200"
          >
            <BsList className="text-xl" />
          </button>
        </div>
      </nav>
      {isOpen && (
        <nav className="bg-slate-800 text-white p-4 w-full rounded-b-2xl px-6 lg:hidden fixed top-15 z-50">
          <div className="container mx-auto">
            <h2 className="text-md md:text-lg lg:text-xl font-semibold">
              Healthcare
            </h2>
            <hr className="border-t border-gray-600 w-full my-4" />
            <ul className="space-y-6 font-semibold">
              {linkList.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 cursor-pointer"
                >
                  {link.icons}
                  <Link
                    href={`/auth/${target === 'patient_user' ? 'user-patient' : 'user-doctor'}/${id}/${link.href}`}
                    className="block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-600">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 font-semibold cursor-pointer"
              >
                <CiLogout />
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
