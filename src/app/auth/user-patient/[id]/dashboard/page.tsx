"use client";
import { CiCalendarDate, CiMail, CiPhone } from "react-icons/ci";
import { useState, useEffect } from "react";
import { fetchPatientWithId, fetchAppointmentWithId, fetchRealTimeData, fetchAppointmentIsReady } from "@/utils/supabase/functions";
import { FaUserMd, FaBriefcaseMedical } from "react-icons/fa";
import { PiAddressBookLight } from "react-icons/pi";
import { useParams } from "next/navigation";
export default function Dashboard() {
    const params = useParams();
    const [user, setUser] = useState<any>(null);
    const [appointment, setAppointment] = useState<any | null>([]);
    const id = params.id;
    const fetchPatient = async () => {
        const { data, error } = await fetchPatientWithId(id);
        if (error) {
            console.log(error);
        } else {
            setUser(data);
        }
    }
    const fetchAppointment = async () => {
        const { data, error } = await fetchAppointmentWithId("patient_id", id);
        if (error) {
            console.log(error);
        } else {
            setAppointment(data);
        }
    }
    const fetchAppointmentReady = async () => {
        await fetchAppointmentIsReady(new Date().toISOString().split("T")[0]);
    }
    useEffect(() => {
        fetchAppointment();
        fetchAppointmentReady();
        fetchPatient();
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
                        <span className="text-lg md:text-xl lg:text-2xl">{user?.username.toUpperCase().charAt(0)}</span>
                    </div>
                    <h1 className="font-medium text-lg md:text-xl lg:text-2xl">
                        {user?.username} {'(Patient)'}
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
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mt-10">
                Appointment History
            </h1>
            {appointment.length > 0 ? (
                <div className="overflow-x-auto mt-5">
                    <table className="table-auto border-collapse border border-gray-400 min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-400 px-4 py-2">ID</th>
                                <th className="border border-gray-400 px-4 py-2">Name</th>
                                <th className="border border-gray-400 px-4 py-2">Schedule</th>
                                <th className="border border-gray-400 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointment?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-400 px-4 py-2">Dr.{item.doctor_name}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.appointment_datetime}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    <hr className="border-t border-gray-300 w-full my-2" />
                    <h1>No appointment history found.</h1>
                </>
            )}
        </div>
    )
}