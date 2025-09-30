import { useEffect, useState } from "react";
import { signUp } from "@/utils/supabase/functions";
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthToast from "../toast/AuthToast";

type ModalAuthenticationProps = {
  onClick: (v: boolean) => void;
};

export default function ModalAuthentication({
  onClick,
}: ModalAuthenticationProps) {
  const [roles, setRoles] = useState<"patient" | "doctor" | "sign-up" | null>(
    null
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<any | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handlerForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    if (roles === "sign-up") {
      const error = await signUp(
        username,
        email,
        password,
        address,
        date,
        phoneNumber
      );
      if (error) {
        console.log(error);
        setStatus(
          <AuthToast
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status={error}
          />
        );
      } else {
        console.log("success");
        setRoles("patient");
        setUsername("");
        setAddress("");
        setDate("");
        setStatus(
          <AuthToast
            icons={<FaCircleCheck className="text-green-400 text-lg" />}
            status="Account created successfully!"
          />
        );
      }
    } else if (roles === "patient") {
      if (email.endsWith("@doctor.com")) {
        setSubmitting(false);
        return setStatus(
          <AuthToast
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status="Email must be a patient email!"
          />
        );
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const id = data?.user?.id;
      if (error) {
        console.log(error.message);
        setStatus(
          <AuthToast
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
    } else if (roles === "doctor") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const id = data?.user?.id;
      if (!email.endsWith("@doctor.com")) {
        setSubmitting(false);
        return setStatus(
          <AuthToast
            icons={<IoIosWarning className="text-red-400 text-lg" />}
            isRed={true}
            status="Email must be a doctor email!"
          />
        );
      }
      if (error) {
        console.log(error);
        setStatus(
          <AuthToast
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
  const loading = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    } else {
      console.log("session", data);
      router.push("/main");
      setLoading(false);
    }
  };
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
  useEffect(() => {
    loading();
  }, []);
  return (
    <>
      <div className="inset-0 fixed z-60 bg-black opacity-50" />
      <div className="inset-0 fixed z-60 flex items-center justify-center px-3 py-10">
        {isLoading ? (
          <div className="bg-white p-5 rounded-lg">
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
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
                  <button
                    type="button"
                    onClick={() => setRoles("patient")}
                    className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-medium cursor-pointer transition duration-200"
                  >
                    Patient
                  </button>
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
        )}
      </div>
    </>
  );
}
