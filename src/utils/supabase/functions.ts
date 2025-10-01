//utility functions for supabase to make query more shorter
import { createClient } from "./client";

//Sign up with user table function
/*
Properties:
- username: username of patient
- email: email of patient
- password: password of patient
- address: address of the patient
- date: date of birth of the patient
- phonenumber: phone number of the patient
*/
export async function signUp(
  username: string,
  email: string,
  password: string,
  address: string,
  date: string,
  phonenumber: string
) {
  const supabase = createClient();
  const pattern = /^[^@]+@(?!doctor\.com$).+$/;
  if (!pattern.test(email)) {
    return "Email must not be a doctor's email";
  }
  if (!username) {
    return "Username is required";
  }
  if (!date) {
    return "Date of birth is required";
  }
  if (!phonenumber) {
    return "Phone number is required";
  }
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    return signUpError.message;
  }
  if (signUpData) {
    const { error: insertError } = await supabase.from("patient_user").insert({
      id: signUpData?.user?.id,
      username,
      email,
      address,
      date_of_birth: date,
      phone_number: phonenumber,
    });
    if (insertError) {
      return insertError.message;
    }
  }
  return null;
}
//Fetch patient with specific id
/*
Properties:
- id: target patient id
*/
export async function fetchPatientWithId(id: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("patient_user")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
//Fetch doctor with specific id
/*
Properties:
- id: target doctor id
*/
export async function fetchDoctorWithId(id: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("doctor_user")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}
//Fetch appointment with specific id
/*
Properties:
- target: target the specific table
- id: target appointment id
*/
export async function fetchAppointmentWithId(target: string, id: any) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointment")
    .select("*")
    .eq(target, id);
  return { data, error };
}
//Fetch doctor that is online
export async function fetchDoctorOnline() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("doctor_user")
    .select("*")
    .eq("status", true);
  return { data, error };
}
//Real time data fetching
/*
Properties:
- channel: channel name for real time data fetching
- event: event type for real time data fetching (INSERT, UPDATE, DELETE, *)
- changes: changes in the table
- table: table name for real time data fetching
- callBack: callback function for real time data fetching
*/
type realTimeProps = {
  channel: string;
  event: "INSERT" | "UPDATE" | "DELETE" | "*";
  changes: any;
  table: string;
  callBack: (payload: any) => void;
};
export async function fetchRealTimeData({
  channel,
  event,
  changes,
  table,
  callBack,
}: realTimeProps) {
  const supabase = createClient();
  const RealTimeChannel = supabase
    .channel(channel)
    .on(
      changes,
      {
        event: event,
        schema: "public",
        table: table,
      },
      (payload) => {
        console.log("Change received!", payload);
        callBack(payload);
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(RealTimeChannel);
  };
}
//Fetch appointment that is ready to be confirmed
/*
Properties:
- datetime: datetime of the appointment
*/
export async function fetchAppointmentIsReady(datetime: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("appointment")
    .select("*")
    .lte("appointment_datetime", datetime)
    .eq("status", "pending");
  if (data?.length) {
    await supabase
      .from('appointment')
      .update({ status: 'Wait for confirmation' })
      .eq('id', data[0].id)
  }
  console.log(datetime);
  return true;
}