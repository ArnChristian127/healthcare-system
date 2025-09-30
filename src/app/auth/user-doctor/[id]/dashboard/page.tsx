"use client";
import {
  fetchRealTimeData,
  fetchDoctorOnline,
  fetchDoctorWithId,
} from "@/utils/supabase/functions";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { FaUserMd, FaBriefcaseMedical } from "react-icons/fa";
import { CiMail, CiPhone, CiUser } from "react-icons/ci";
export default function Dashboard() {
  const [appointmentRequest, setAppointmentRequest] = useState(0);
  const [doctorOnline, setDoctorOnline] = useState(0);
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const id = params.id;
  const fetchDoctor = async () => {
    const { data, error } = await fetchDoctorWithId(id);
    if (error) {
      console.log(error);
    } else {
      setUser(data);
    }
  };
  const fetchAppointment = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("appointment")
      .select("*")
      .in("status", ["Pending", "Wait for confirmation"]);
    setAppointmentRequest(data?.length || 0);
  };
  const fetchDoctorOnlineCount = async () => {
    const { data } = await fetchDoctorOnline();
    setDoctorOnline(data?.length || 0);
  };
  useEffect(() => {
    fetchDoctor();
    fetchDoctorOnlineCount();
    fetchAppointment();
    fetchRealTimeData({
      channel: "appointment_doctor_changes",
      event: "*",
      changes: "postgres_changes",
      table: "appointment",
      callBack: fetchAppointment,
    });
  }, []);
  return (
    <div className="text-gray-700">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 text-white gap-5">
        <div className="bg-blue-300 p-5 rounded-lg space-y-3 shadow-lg shadow-blue-200">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">APPOINTMENT REQUEST</h1>
            <CiUser className="text-lg" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {appointmentRequest}
          </h1>
        </div>
        <div className="bg-cyan-400 p-5 rounded-lg space-y-3 shadow-lg shadow-cyan-300">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">DOCTORS ONLINE</h1>
            <FaUserMd className="text-lg" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {doctorOnline}
          </h1>
        </div>
        <div className="bg-red-400 p-5 rounded-lg space-y-3 shadow-lg shadow-red-300">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">TOTAL MEDICAL RECORDS</h1>
            <FaBriefcaseMedical className="text-lg" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">0</h1>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-300 p-5 mt-10 w-full max-w-[500px] space-y-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-15 h-15 bg-white text-gray-700 border-2 border-teal-400 rounded-full flex items-center justify-center font-medium">
            <span className="text-lg md:text-xl lg:text-2xl">
              {user?.username.toUpperCase().charAt(0)}
            </span>
          </div>
          <h1 className="font-medium text-lg md:text-xl lg:text-2xl">
            {user?.username} {"(Doctor)"}
          </h1>
        </div>
        <hr className="border-t border-gray-300 w-full" />
        <div className="flex items-center gap-2 flex-wrap">
          <CiMail className="text-lg md:text-xl lg:text-2xl" />
          <h1>Email:</h1>
          <h1>{user?.email}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CiPhone className="text-lg md:text-xl lg:text-2xl" />
          <h1>Phone Number:</h1>
          <h1>+0{user?.phone_number}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <FaUserMd className="text-lg md:text-xl lg:text-2xl" />
          <h1>Specialist:</h1>
          <h1>{user?.specialist}</h1>
        </div>
      </div>
    </div>
  );
}
