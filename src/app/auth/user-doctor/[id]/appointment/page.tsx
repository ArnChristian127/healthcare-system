"use client";
import { fetchRealTimeData } from "@/utils/supabase/functions";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
export default function Appointment() {
  const [appointment, setAppointment] = useState<any>([]);
  const params = useParams();
  const patient_id = params.id;
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
    }
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
        Appointment Request
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
