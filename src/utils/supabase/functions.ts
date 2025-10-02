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
  /*
    we use a special regex (regular expression) to check the pattern of text
    in this casewe want to make sure that the email is not a doctor's email
    since patient and doctor are seperated in different tables
  */
  const pattern = /^[^@]+@(?!doctor\.com$).+$/;
  //check if the email is a doctor's email
  if (!pattern.test(email)) {
    return "Email must not be a doctor's email";
  }
  //check if the username is empty, returns an error
  if (!username) {
    return "Username is required";
  }
  //check if the date of birth is empty, returns an error
  if (!date) {
    return "Date of birth is required";
  }
  //check if the phone number is empty, returns an error
  if (!phonenumber) {
    return "Phone number is required";
  }
  //check if the address is empty, returns an error
  if (!address) {
    return "Address is required";
  }
  /*
    here's the special function in supabase auth.signUp will eventually transmit to
    the database itself by checking in authentication. auth.signUp have more feature
    like destructuring the data and error. data represent our data that we get
    after the registration was successful. error represent the error that we get
    if the registration was failed. on the other hand, we also need to insert 
    the data of the patient into the patient_user table.
  */
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    return signUpError.message;
  }
  //check if the user is not null, then insert the data into the patient_user table
  if (signUpData.user) {
    const { error: insertError } = await supabase.from("patient_user").insert({
      //the id from registration
      id: signUpData.user.id,
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