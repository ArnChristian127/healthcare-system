"use client";
import { FaCircleCheck, FaQuestion, FaLocationDot } from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import { useEffect } from "react";
import CardDoctors from "@/components/about-page/CardDoctors";
export default function About() {
    useEffect(() => {
        document.title = "Healthcare - About";
    });
    return (
        <>
            <div className="relative bg-[url('/app-page/home/bg.jpg')] bg-cover bg-center text-white px-6 py-20 md:py-25 lg:py-30">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container mx-auto sm:px-5 md:px-10 lg:px-15">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mt-3">About Us</h1>
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
                    </div>
                </div>
            </div>
            <div className="px-6 py-20 md:py-25 lg:py-30 bg-gray-50">
                <div className="container mx-auto flex justify-center items-center flex-col">
                    <div className="text-center">
                        <h1 className="text-lg md:text-xl lg:text-2xl font-medium">
                            Our Doctors
                        </h1>
                        <p className="mt-3 whitespace-pre-line">
                            {"lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        <CardDoctors src="/app-page/about/doctor-1.jpg" alt="Doctor-1" name="Dr. John Doe">
                            <p className="font-medium">Dentist</p>
                        </CardDoctors>
                        <CardDoctors src="/app-page/about/doctor-2.jpg" alt="Doctor-1" name="Dr. John Doe">
                            <p className="font-medium">Dentist</p>
                        </CardDoctors>
                        <CardDoctors src="/app-page/about/doctor-3.jpg" alt="Doctor-1" name="Dr. John Doe">
                            <p className="font-medium">Dentist</p>
                        </CardDoctors>
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
        </>
    );
}