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
import { CiMail, CiPhone } from "react-icons/ci";
export default function Dashboard() {
  const [appointmentRequest, setAppointmentRequest] = useState(0);
  const [doctorOnline, setDoctorOnline] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [appointment, setAppointment] = useState<any | null>([]);
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
    const { data, error } = await supabase
      .from("appointment")
      .select("*")
      .in("status", ["Pending", "Wait for confirmation"]);
    if (error) {
      console.log(error);
    } else {
      setAppointment(data);
      setAppointmentRequest(data?.length || 0);
    }
  };
  const fetchDoctorOnlineCount = async () => {
    const { data } = await fetchDoctorOnline();
    setDoctorOnline(data?.length || 0);
  };
  const handleApprove = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("appointment")
      .update({ status: "Approved" })
      .eq("id", id);
    if (error) {
      console.log(error);
    } else {
      fetchAppointment();
    }
  };
  useEffect(() => {
    fetchDoctor();
    fetchDoctorOnlineCount();
    fetchAppointment();
    fetchRealTimeData({
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
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {appointmentRequest}
          </h1>
        </div>
        <div className="bg-cyan-400 p-5 rounded-lg space-y-3 shadow-lg shadow-cyan-300">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">DOCTORS ONLINE</h1>
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
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mt-10">
        Appointments Schedule
      </h1>
      {appointment.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="table-auto border-collapse border border-gray-400 min-w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">
                  Patient Name
                </th>
                <th className="border border-gray-400 px-4 py-2">
                  Date & Time
                </th>
                <th className="border border-gray-400 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointment?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.patient_name}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {new Date(item.appointment_datetime).toLocaleString()}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <div className="flex items-center justify-between gap-5 flex-wrap">
                      {item.status}
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 transition duration-300 px-3 py-2 text-white rounded-md cursor-pointer"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <hr className="border-t border-gray-300 w-full my-2" />
          <h1>No appointment schedule available.</h1>
        </>
      )}
    </div>
  );
}
