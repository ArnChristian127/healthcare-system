import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { BsList } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import ModalLogout from "../modals/ModalLogout";

type LinkList = {
    href: string;
    label: string;
    icons: any;
}
type SidebarProps = {
    id: any;
    linkList: LinkList[];
}
export default function Navbar({ id, linkList }: SidebarProps) {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const fetch = async () => {
        const { data, error } = await supabase.from('patient_user').select('*').eq('id', id).single();
        if (error) {
            console.log(error);
        } else {
            setUser(data);
        }
    }
    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            {isModalOpen && (
                <ModalLogout onClose={() => setIsModalOpen(false)}/>
            )}
            <nav className="px-6 py-4 text-white bg-slate-700 lg:hidden fixed top-0 w-full z-50">
                <div className="flex items-center justify-between mx-auto container">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-white text-gray-700 border-2 border-teal-400 rounded-full flex items-center justify-center font-medium">
                            {user?.username.toUpperCase().charAt(0)}
                        </div>
                        <h1 className="font-medium">
                            {user?.username}
                        </h1>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white px-1 py-1 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-sm cursor-pointer transition duration-200">
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
                                <li key={index} className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 cursor-pointer">
                                    {link.icons}
                                    <Link href={`/auth/user-patient/${id}/${link.href}`} className="block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 pt-3 border-t border-gray-600">
                            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 font-semibold cursor-pointer">
                                <CiLogout />
                                Logout
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </>
    )
}