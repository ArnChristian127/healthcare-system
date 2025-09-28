"use client";
import { FaCircleCheck, FaQuestion, FaLocationDot } from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import { IoCallSharp } from "react-icons/io5";
import { useEffect } from "react";
import Link from "next/link";
export default function Home() {
    useEffect(() => {
        document.title = "Healthcare - Home";
    }, []);
    return (
        <>
            <div className="relative bg-[url('/app-page/home/bg.jpg')] bg-cover bg-center text-white px-6 py-20 md:py-25 lg:py-30">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container mx-auto sm:px-5 md:px-10 lg:px-15">
                    <h1 className="font-medium text-md md:text-lg lg:text-xl">THE BEST MEDICAL CENTER</h1>
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mt-3">Bringing health</h1>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl mt-3">to life for the whole family</h1>
                    <div className="mt-10">
                        <Link href="/main/about" className="border py-2 px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 rounded-md hover:border-teal-400 hover:bg-teal-400 focus:border-teal-400 focus:bg-teal-400 transition duration-200 cursor-pointer">
                            LEARN MORE
                        </Link>
                    </div>
                </div>
            </div>
            <div className="px-6 py-20 md:py-25 lg:py-30">
                <div className="container mx-auto flex flex-wrap items-center justify-center gap-20 sm:px-5 md:px-10 lg:px-15">
                    <img src="/app-page/home/about.jpg" alt="About" className="w-full h-auto max-w-[250px] md:max-w-[300px] lg:max-w-[350px] rounded-lg shadow-[-10px_20px_0px_theme(color.teal.400)]" />
                    <div className="text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl">
                            Welcome to
                        </h1>
                        <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl">
                            Healthcare Clinic
                        </h1>
                        <p className="mt-3 whitespace-pre-line">
                            {"lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        </p>
                        <div className="mt-3 flex flex-col gap-3 items-center justify-center lg:items-start">
                            <div className="flex items-center gap-2">
                                <FaCircleCheck className="text-teal-400" />
                                <p>lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCircleCheck className="text-teal-400" />
                                <p>lorem ipsum dolor sit amet</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCircleCheck className="text-teal-400" />
                                <p>lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link href="/about" className="px-10 py-4 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 transition duration-200 text-white rounded-md">
                                ABOUT US
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-30 md:py-40 lg:py-50 bg-gray-50">
                <div className="container mx-auto flex items-center justify-center flex-col">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold">
                            Quality Health
                        </h1>
                        <p className="mt-3 whitespace-pre-line">
                            {"lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        </p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-white p-5 rounded-md shadow border border-gray-300 flex justify-center items-center text-center flex-col gap-5">
                            <div className="w-10 h-10 md:h-15 md:w-15 lg:h-20 lg:w-20 bg-teal-400 flex justify-center items-center text-white rounded-full">
                                <FaQuestion className="text-2xl md:text-3xl lg:text-4xl" />
                            </div>
                            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                                Health Consultation
                            </h1>
                            <p>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-md shadow border border-gray-300 flex justify-center items-center text-center flex-col gap-5">
                            <div className="w-10 h-10 md:h-15 md:w-15 lg:h-20 lg:w-20 bg-teal-400 flex justify-center items-center text-white rounded-full">
                                <FaLocationDot className="text-2xl md:text-3xl lg:text-4xl" />
                            </div>
                            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                                Find Health
                            </h1>
                            <p>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-md shadow border border-gray-300 flex justify-center items-center text-center flex-col gap-5">
                            <div className="w-10 h-10 md:h-15 md:w-15 lg:h-20 lg:w-20 bg-teal-400 flex justify-center items-center text-white rounded-full">
                                <FaUserMd className="text-2xl md:text-3xl lg:text-4xl" />
                            </div>
                            <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                                Search For Doctor
                            </h1>
                            <p>
                                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 text-white">
                <div className="relative bg-[url('/app-page/home/grid-1.jpg')] bg-cover bg-center h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-teal-700/95 md:bg-teal-700/80 lg:bg-teal-700/60" />
                    <div className="relative container mx-auto text-center md:text-right lg:text-right">
                        <h1 className="font-medium text-base md:text-md lg:text-lg">WE ARE HERE FOR YOUR</h1>
                        <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mt-2">Book Appointment</h1>
                    </div>
                </div>
                <div className="relative bg-[url('/app-page/home/grid-2.jpg')] bg-cover bg-center h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-teal-900/95 md:bg-teal-900/80  lg:bg-teal-900/60" />
                    <div className="relative container mx-auto flex items-center justify-center lg:justify-start gap-5 text-center md:text-left lg:text-left">
                        <IoCallSharp className="text-3xl md:text-4xl lg:text-5xl" />
                        <div>
                            <h1 className="font-medium text-base md:text-md lg:text-lg">Emergency Call</h1>
                            <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl mt-2">
                                {'+021-123-4567'}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}