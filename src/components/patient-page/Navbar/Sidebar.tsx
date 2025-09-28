import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { CiLogout } from "react-icons/ci";
import Link from "next/link"
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
export default function Sidebar({ id, linkList }: SidebarProps) {
    const [user, setUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const supabase = createClient();
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
    }, [])
    return (
        <>
            {isModalOpen && (
                <ModalLogout onClose={setIsModalOpen} />
            )}
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
                            {user?.username}
                        </h1>
                    </div>
                    {linkList.map((link, index) => (
                        <li key={index} className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 cursor-pointer">
                            {link.icons}
                            <Link href={`/auth/user-patient/${id}/${link.href}`} className="block">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto pt-3 border-t border-gray-600">
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 font-semibold cursor-pointer">
                        <CiLogout />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    )
}