import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/supabase/functions";
import Link from "next/link"

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
    const router = useRouter();
    const handleLogout = async () => {
        await signOut();
        router.push('/main');
    }
    return (
        <aside className="bg-slate-700 text-white p-4 w-full hidden lg:flex lg:flex-col lg:w-64 rounded-r-2xl">
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
            <div className="mt-auto pt-3 border-t border-gray-600">
                <button onClick={handleLogout} className="flex items-center gap-3 hover:text-teal-400 focus:text-teal-400 font-semibold cursor-pointer">
                    <CiLogout />
                    Logout
                </button>
            </div>
        </aside>
    )
}