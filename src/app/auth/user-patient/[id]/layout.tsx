"use client";
import { FaUserMd, FaHistory, FaMoneyCheck } from "react-icons/fa";
import { useParams } from "next/navigation";
import { IoBarChartSharp } from "react-icons/io5";
import Sidebar from "@/components/patient-page/Sidebar";

export default function UserPatientLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const id = params.id;
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar
        id={id}
        linkList={[
          { href: `dashboard`, label: "Overview", icons: <IoBarChartSharp /> },
          { href: `appointment`, label: "Appointment", icons: <FaUserMd /> },
          { href: `history`, label: "History", icons: <FaHistory /> },
          { href: `balance`, label: "Balance", icons: <FaMoneyCheck /> },
        ]}
      />
      <main className="p-6 flex-1">
        {children}
      </main>
    </div>
  );
}