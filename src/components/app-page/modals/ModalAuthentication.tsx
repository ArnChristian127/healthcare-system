import { useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
type ModalAuthenticationProps = {
    onClick: (v: boolean) => void;
}
export default function ModalAuthentication({ onClick }: ModalAuthenticationProps) {
    const [roles, setRoles] = useState<'patient' | 'doctor' | 'sign-up' | null>(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(true);
    const handlerForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (roles === 'patient') {
            console.log('patient');
        } else if (roles === 'doctor') {
            console.log('doctor');
        } else if (roles === 'sign-up') {
            console.log('sign-up');
        }
    }
    const loading = () => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }
    const back = () => {
        setRoles(null);
        setEmail('');
        setPassword('');
        setUsername('');
    }
    useEffect(() => {
        loading();
    }, []);
    return (
        <>
            <div className="inset-0 fixed z-60 bg-black opacity-50" />
            <div className="inset-0 fixed z-60 flex items-center justify-center px-3">
                {isLoading ? (
                    <div className="bg-white p-5 rounded-lg">
                        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin"/>
                    </div>
                ) : (
                    <form className="bg-white p-5 rounded-lg w-120 space-y-4" onSubmit={handlerForm}>
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-teal-400">
                                {roles === 'sign-up' && 'Sign Up For Patient'}
                                {roles === 'patient' && 'Patient Sign In'}
                                {roles === 'doctor' && 'Doctor Sign In'}
                                {!roles && 'Sign In'}
                            </h1>
                            <button className="cursor-pointer hover:text-teal-500 focus:text-teal-500" onClick={() => onClick(false)}>
                                <IoExitOutline className="text-lg md:text-xl lg:text-2xl" />
                            </button>
                        </div>
                        {roles && (
                            <>
                                {roles === 'sign-up' && (
                                    <>
                                        <label htmlFor="username" className="font-medium text-md md:text-lg">Username</label>
                                        <input
                                            id="username"
                                            type="text"
                                            className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                                            value={username}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                            required
                                        />
                                    </>
                                )}
                                <label htmlFor="email" className="font-medium text-md md:text-lg">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="password" className="font-medium text-md md:text-lg">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full outline-none border border-gray-300 px-3 p-3 rounded-lg mt-2"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                <button className="text-teal-400 hover:text-teal-500 focus:text-teal-500 cursor-pointer font-medium">
                                    Forgot Password?
                                </button>
                                <button type="submit" className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-lg p-3 text-white cursor-pointer transition duration-200">
                                    {roles === 'sign-up' ? 'Sign Up' : 'Sign In'}
                                </button>
                                <button type="button" onClick={() => back()} className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-semibold cursor-pointer transition duration-200">
                                    Return to SSO
                                </button>
                            </>
                        )}
                        {!roles && (
                            <>
                                <button type="button" onClick={() => setRoles('patient')} className="w-full border hover:bg-gray-100 focus:bg-gray-100 border-gray-300 rounded-lg p-3 font-semibold cursor-pointer transition duration-200">
                                    Patient
                                </button>
                                <button type="button" onClick={() => setRoles('doctor')} className="w-full bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-lg p-3 text-white cursor-pointer transition duration-200">
                                    Doctor
                                </button>
                                <p className="text-center">
                                    Don't have an account? <span onClick={() => setRoles('sign-up')} className="text-teal-400 hover:text-teal-500 focus:text-teal-500 cursor-pointer font-medium">Sign Up Patient</span>
                                </p>
                            </>
                        )}
                    </form>
                )}
            </div>
        </>
    );
}