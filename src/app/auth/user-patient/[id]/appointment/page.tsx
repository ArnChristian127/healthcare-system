"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { CiPhone } from "react-icons/ci";
import { FaUserMd } from "react-icons/fa";
import { useParams } from "next/navigation";
import ModalAppointment from "@/components/patient-page/modals/ModalAppointment";

export default function Appointment() {
    const supabase = createClient();
    const [showModal, setShowModal] = useState(null);
    const [patient, setPatient] = useState<any>(null);
    const [doctors, setDoctors] = useState<any>([]);
    const params = useParams();
    const patient_id = params.id;
    const fetchPatient = async () => {
        const { data, error } = await supabase.from('patient_user').select('*').eq('id', patient_id).single();
        if (error) {
            console.log(error);
        } else {
            setPatient(data);
        }
    }
    const fetchDoctor = async () => {
        const { data, error } = await supabase.from('doctor_user').select('*').eq('status', true);
        if (error) {
            console.log(error);
        } else {
            setDoctors(data);
        }
    }
    useEffect(() => {
        fetchPatient();
        fetchDoctor();
        const channel = supabase
            .channel("doctor_user_changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "doctor_user",
                },
                (payload) => {
                    console.log("Change received!", payload);
                    fetchDoctor();
                }
            )
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    return (
        <>
            {showModal && (
                <ModalAppointment
                    doctor={showModal}
                    patient={patient}
                    onClose={() => setShowModal(null)}
                />
            )}
            <div className="text-gray-700">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mt-10">
                    Appointment
                </h1>
                <hr className="border-t border-gray-300 w-full my-5" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {doctors.map((doctor: any) => (
                        <div className="p-5 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-3" key={doctor.id}>
                            <div className="flex items-center gap-3">
                                <div className="w-15 h-15 bg-white text-gray-700 border-2 border-teal-400 rounded-full flex items-center justify-center font-medium">
                                    <span className="text-lg md:text-xl lg:text-2xl">{doctor?.username.toUpperCase().charAt(0)}</span>
                                </div>
                                <h1 className="font-medium text-lg md:text-xl lg:text-2xl">
                                    Dr. {doctor?.username}
                                </h1>
                            </div>
                            <hr className="border-t border-gray-300 w-full" />
                            <div className="flex items-center gap-3">
                                <FaUserMd className="text-lg" />
                                <h1>Specialist: {doctor?.specialist}</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                <CiPhone className="text-lg md:text-xl lg:text-2xl" />
                                <h1>Phone Number:</h1>
                                <h1>+0{doctor?.phone_number}</h1>
                            </div>
                            <button onClick={() => setShowModal(doctor)} className="font-medium bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white p-2 rounded-md">
                                Make Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}