"use client";
import { CiCalendarDate, CiMail, CiPhone } from "react-icons/ci";
import { useState, useEffect } from "react";
import {
  fetchPatientWithId,
  fetchAppointmentIsReady,
} from "@/utils/supabase/functions";
import { FaUserMd, FaBriefcaseMedical } from "react-icons/fa";
import { PiAddressBookLight } from "react-icons/pi";
import { useParams } from "next/navigation";
export default function Dashboard() {
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const id = params.id;
  const fetchPatient = async () => {
    const { data, error } = await fetchPatientWithId(id);
    if (error) {
      console.log(error);
    } else {
      setUser(data);
    }
  };
  const fetchAppointmentReady = async () => {
    await fetchAppointmentIsReady(new Date().toISOString());
  };
  useEffect(() => {
    fetchPatient();
    fetchAppointmentReady();
  }, []);
  return (
    <div className="text-gray-700">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 text-white gap-5">
        <div className="bg-teal-400 p-5 rounded-lg space-y-3 shadow-lg shadow-teal-300">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">BALANCE</h1>
            <h1 className="font-bold text-lg">$</h1>
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            $ 100.00
          </h1>
        </div>
        <div className="bg-blue-300 p-5 rounded-lg space-y-3 shadow-lg shadow-blue-200">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">CURRENT APPOINTMENT DOCTOR</h1>
            <FaUserMd className="text-lg" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Dr. Rosales
          </h1>
        </div>
        <div className="bg-red-400 p-5 rounded-lg space-y-3 shadow-lg shadow-red-300">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">LATEST MEDICAL RESULT</h1>
            <FaBriefcaseMedical className="text-lg" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Blood Sugar: Normal
          </h1>
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
            {user?.username} {"(Patient)"}
          </h1>
        </div>
        <hr className="border-t border-gray-300 w-full" />
        <div className="flex items-center gap-2 flex-wrap">
          <CiCalendarDate className="text-lg md:text-xl lg:text-2xl" />
          <h1>Date:</h1>
          <h1>{user?.date_of_birth}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CiMail className="text-lg md:text-xl lg:text-2xl" />
          <h1>Email:</h1>
          <h1>{user?.email}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <PiAddressBookLight className="text-lg md:text-xl lg:text-2xl" />
          <h1>Address:</h1>
          <h1>{user?.address}</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <CiPhone className="text-lg md:text-xl lg:text-2xl" />
          <h1>Phone Number:</h1>
          <h1>+0{user?.phone_number}</h1>
        </div>
      </div>
    </div>
  );
}
