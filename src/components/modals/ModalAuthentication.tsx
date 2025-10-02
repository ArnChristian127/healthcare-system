//Step 6 Creating JWTS Authentication
/*
  after creating the modal UI, we will also create a simple and fully functional
  authentication system using supabase features that allows users to sign up,
  sign in, and sign out.
*/
import { useState } from "react";
import { signUp } from "@/utils/supabase/functions";
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ErrorMessage from "@/components/toast/ErrorMessage";

/*
  this properties was created to handle the onClick event of the modal
  it's also be used to close when the user clicks the close button
  this code was chain in: components > navbar > Navbar.tsx
*/
type ModalAuthenticationProps = {
  onClick: (v: boolean) => void;
};

export default function ModalAuthentication({
  onClick,
}: ModalAuthenticationProps) {
  //declaring state by typing the specific type
  const [roles, setRoles] = useState<"patient" | "doctor" | "sign-up" | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<any | null>(null);
  const supabase = createClient();
  const router = useRouter();

  /*
    this function will handle the form submission and by using
    React.FormEvent as props it wil prevent from restarting the web.
  */
  const handlerForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    /*
      check if the user press sign up, the function from supabase will select as signUp
      instead of signIn. You can check the function signUp in utils > supabase > functions.ts
     */
    if (roles === "sign-up") {
      const error = await signUp(
        username,
        email,
        password,
        address,
        date,
        phoneNumber
      );
      //check if error
      if (error) {
        console.log(error);
        setStatus(
          <ErrorMessage
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status={error}
          />
        );
      /*
        if success, then it will display a success message and clear the form only gmail and password will remain
        and set the roles to patient (goes in patient login)
      */
      } else {
        console.log("success");
        setRoles("patient");
        setUsername("");
        setAddress("");
        setPhoneNumber("");
        setDate("");
        setStatus(
          <ErrorMessage
            icons={<FaCircleCheck className="text-green-400 text-lg" />}
            status="Account created successfully!"
          />
        );
      }
    /*
      here's the sign in for patient and doctors
      if the email ends with @doctor.com, then it will sign in as doctor
      else it will sign in as patient
    */
    } else if (roles === "patient") {
      //check if email is doctor email then will throw an error
      if (email.endsWith("@doctor.com")) {
        //this is only just loading animation
        setSubmitting(false);
        return setStatus(
          <ErrorMessage
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status="Email must be a patient email!"
          />
        );
      }
      /*
        here's the supabase JWT token once the user sign in
        it will automatically go in the designated page
        to see the token you can type data?.session?.access_token in console.log
      */
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      /*
        once you get the data from signInWithPassword, you have the access to put the id
        in the router.push to redirect the user to the dashboard and the value of id will go there
        ex: localhost:3000/auth/user-patient/1234567890/dashboard (its called dynamic routing)
      */
      const id = data?.user?.id;
      if (error) {
        console.log(error.message);
        setStatus(
          <ErrorMessage
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status={error.message}
          />
        );
      } else {
        console.log("success");
        router.push(`/auth/user-patient/${id}/dashboard`);
        onClick(false);
      }
      //same as doctor but in doctor page
    } else if (roles === "doctor") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const id = data?.user?.id;
      if (!email.endsWith("@doctor.com")) {
        setSubmitting(false);
        return setStatus(
          <ErrorMessage
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status="Email must be a doctor email!"
          />
        );
      }
      if (error) {
        console.log(error);
        setStatus(
          <ErrorMessage
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status={error.message}
          />
        );
      } else {
        console.log("success");
        router.push(`/auth/user-doctor/${id}/`);
        onClick(false);
      }
    }
    setSubmitting(false);
  };
  //this function clears the entire output
  const back = () => {
    setRoles(null);
    setStatus(null);
    setEmail("");
    setPassword("");
    setUsername("");
    setAddress("");
    setDate("");
    setPhoneNumber("");
  };
  return (
    <>
      <div className="inset-0 fixed z-60 bg-black opacity-50" />
      <div className="inset-0 fixed z-60 flex items-center justify-center px-3 py-10">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-5">
          <form className="space-y-4" onSubmit={handlerForm}>
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-teal-400">
                {roles === "sign-up" && "Sign Up For Patient"}
                {roles === "patient" && "Patient Sign In"}
                {roles === "doctor" && "Doctor Sign In"}
                {!roles && "Sign In"}
              </h1>
              <button
                type="button"
                className="cursor-pointer hover:text-teal-500 focus:text-teal-500"
                onClick={() => onClick(false)}
              >
                <IoExitOutline className="text-lg md:text-xl lg:text-2xl" />
              </button>
            </div>
            {/* here's the roles condition, it will renders the ui base on the roles that you press in button */}
            {roles && (
              <>
                {roles === "sign-up" && (
                  <>
                    <label
                      htmlFor="username"
                      className="font-medium text-md md:text-lg"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </>
                )}
                <label
                  htmlFor="email"
                  className="font-medium text-md md:text-lg"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="password"
                  className="font-medium text-md md:text-lg"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {roles === "sign-up" && (
                  <>
                    <div className="flex md:flex-row lg:flex-row justify-between gap-3 flex-col">
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="address"
                          className="font-medium text-md md:text-lg"
                        >
                          Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="number"
                          className="font-medium text-md md:text-lg"
                        >
                          Phone Number
                        </label>
                        <input
                          id="number"
                          type="text"
                          className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex-col flex">
                      <label
                        htmlFor="date"
                        className="font-medium text-md md:text-lg"
                      >
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {status}
                {roles !== "sign-up" && (
                  <button className="text-teal-400 hover:text-teal-500 focus:text-teal-500 cursor-pointer font-medium">
                    Forgot Password?
                  </button>
                )}
                {isSubmitting ? (
                  <div className="w-full flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 font-semibold rounded-lg p-3 text-white cursor-pointer transition duration-200 flex items-center justify-center"
                  >
                    {roles === "sign-up" ? "Sign Up" : "Sign In"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => back()}
                  className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-semibold cursor-pointer transition duration-200"
                >
                  Return to Selection
                </button>
              </>
            )}
            {!roles && (
              <>
                {/* this is the condition if the user press patient button, it will render the patient ui */}
                <button
                  type="button"
                  onClick={() => setRoles("patient")}
                  className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-medium cursor-pointer transition duration-200"
                >
                  Patient
                </button>
                {/* this is the condition if the user press doctor button, it will render the doctor ui */}
                <button
                  type="button"
                  onClick={() => setRoles("doctor")}
                  className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-lg p-3 text-white cursor-pointer transition duration-200 font-medium"
                >
                  Doctor
                </button>
                <p className="text-center">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setRoles("sign-up")}
                    className="text-teal-400 hover:text-teal-500 focus:text-teal-500 cursor-pointer font-medium"
                  >
                    Sign Up Patient
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
