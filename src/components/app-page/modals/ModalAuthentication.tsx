import { IoExitOutline } from "react-icons/io5";

type ModalAuthenticationProps = {
    username?: string;
    email?: string;
    password?: string;
    role: "patient" | "doctor" | 'sign-up' | null;
    setRole: (v: "patient" | "doctor" | 'sign-up' | null) => void;
    onClick: (v: boolean) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ModalAuthentication({
    username,
    email,
    password,
    role,
    setRole,
    onClick,
    onSubmit,
    onChangeUsername,
    onChangeEmail,
    onChangePassword }: ModalAuthenticationProps) {
    return (
        <>
            <div className="inset-0 fixed z-60 bg-black opacity-50" />
            <div className="inset-0 fixed z-60 flex items-center justify-center px-3">
                <form className="bg-white p-5 rounded-lg w-120 space-y-4" onSubmit={onSubmit}>
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
                            {!role && "Sign In"}
                            {role === "sign-up" && "Patient Sign Up"}
                            {role === "patient" && "Patient Sign In"}
                            {role === "doctor" && "Doctor Sign In"}
                        </h1>
                        <button className="cursor-pointer hover:text-teal-500 focus:text-teal-500" onClick={() => onClick(false)}>
                            <IoExitOutline className="text-lg md:text-xl lg:text-2xl" />
                        </button>
                    </div>
                    {(!role) && (
                        <>
                            <button type="button" onClick={() => setRole("patient")} className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-semibold cursor-pointer transition duration-200">
                                Patient Sign In
                            </button>
                            <button type="button" onClick={() => setRole("doctor")} className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-lg p-3 text-white cursor-pointer transition duration-200">
                                Doctor Sign In
                            </button>
                            <p className="text-center">
                                Don't have an account? <span onClick={() => setRole("sign-up")} className="text-teal-400 hover:text-teal-500 focus:text-teal-500 cursor-pointer font-medium">Patient Sign Up</span>
                            </p>
                        </>
                    )}
                    {role === 'sign-up' && (
                        <>
                            <input
                                className="w-full border border-gray-300 outline-none rounded-lg p-3 px-3"
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={onChangeUsername}
                            />
                        </>
                    )}
                    {role && (
                        <>
                            <input
                                className="w-full border border-gray-300 outline-none rounded-lg p-3 px-3"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                            />
                            <input
                                className="w-full border border-gray-300 outline-none rounded-lg p-3 px-3"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </>
                    )}
                    {role && (
                        <>
                            <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-lg p-3 text-white cursor-pointer transition duration-200">
                                {role === 'sign-up' ? "Sign Up" : "Sign In"}
                            </button>
                            <button type="button" onClick={() => setRole(null) } className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-semibold cursor-pointer transition duration-200">
                                Return to SSO
                            </button>
                        </>
                    )}
                </form>
            </div>
        </>
    );
}