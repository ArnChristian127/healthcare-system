import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IoIosWarning } from "react-icons/io";
import AuthToast from "@/components/app-page/toast/AuthToast";
type ModalAppointmentProps = {
  doctor: any;
  patient: any;
  onClose: () => void;
};
export default function ModalAppointment({
  doctor,
  patient,
  onClose,
}: ModalAppointmentProps) {
  const supabase = createClient();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<any>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    if (!date || !time) {
      setStatus(
        <AuthToast
          icons={<IoIosWarning className="text-red-400 text-lg" />}
          isRed={true}
          status="Please select both date and time"
        />
      );
      setSubmitting(false);
      return;
    }
    const datetime = new Date(`${date}T${time}:00`);
    const isoDatetime = datetime.toISOString();
    const { data, error } = await supabase.from("appointment").insert({
      doctor_id: doctor.id,
      doctor_name: doctor.username,
      patient_id: patient.id,
      patient_name: patient.username,
      appointment_datetime: isoDatetime,
      status: "pending",
    });
    if (error) {
      setStatus(
        <AuthToast
          icons={<IoIosWarning className="text-red-400 text-lg" />}
          isRed={true}
          status={error.message}
        />
      );
    } else {
      console.log(data);
      onClose();
    }
    setSubmitting(false);
  };
  return (
    <>
      <div className="inset-0 bg-black opacity-50 fixed z-60" />
      <div
        className="inset-0 fixed z-60 flex justify-center items-center px-3 text-sm md:text-base"
        onSubmit={handleSubmit}
      >
        <form className="bg-white rounded-lg p-5 w-120 space-y-5">
          <h1 className="text-md md:text-lg lg:text-xl font-semibold text-teal-400">
            Appointment Schedule
          </h1>
          <div>
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          {status}
          {isSubmitting ? (
            <div className="w-full flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white transition duration-300 p-2 rounded-md cursor-pointer w-full"
            >
              Schedule
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-2 font-medium cursor-pointer transition duration-200"
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
}
