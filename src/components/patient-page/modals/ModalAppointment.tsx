import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
type ModalAppointmentProps = {
    doctor: any;
    patient: any;
    onClose: () => void;
}
export default function ModalAppointment({ doctor, patient, onClose }: ModalAppointmentProps) {
    const supabase = createClient();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('appointment').insert({
            doctor_id: doctor.id,
            patient_id: patient.id,
            status: 'pending',
            doctor_name: doctor.username,
            patient_name: patient.username,
            appointment_date: date,
            appointment_time: time,
        });
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            onClose();
        }
    }
    return (
        <>
            <div className="inset-0 bg-black opacity-50 fixed z-60" />
            <div className="inset-0 fixed z-60 flex justify-center items-center px-3 text-sm md:text-base" onSubmit={handleSubmit}>
                <form className="bg-white rounded-lg p-5 w-120">
                    <h1 className="text-md md:text-lg lg:text-xl font-semibold text-teal-400">
                        Appointment Schedule
                    </h1>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mt-5">
                        <label className="text-sm font-medium text-gray-700">
                            Time
                        </label>
                        <input
                            type="time"
                            className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white transition duration-300 p-2 rounded-md cursor-pointer w-full mt-5">
                        Schedule
                    </button>
                    <button type="button" onClick={onClose} className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-2 font-medium cursor-pointer transition duration-200 mt-5">
                        Close
                    </button>
                </form>
            </div>
        </>
    );
}