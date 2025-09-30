"use client";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { FaUserMd } from "react-icons/fa";
import { useEffect } from "react";
import CardDoctors from "@/components/card/CardDoctors";
import Card from "@/components/card/Card";
import TextIcon from "@/components/typograhy/TextIcon";
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
                            <TextIcon icon={<FaCircleCheck className="text-teal-400" />} text="lorem ipsum dolor sit amet" />
                            <TextIcon icon={<FaCircleCheck className="text-teal-400" />} text="lorem ipsum dolor sit amet" />
                            <TextIcon icon={<FaCircleCheck className="text-teal-400" />} text="lorem ipsum dolor sit amet" />
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
                        <Card
                            icons={<FaUserMd />}
                            title="Health Consultation"
                            description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        />
                        <Card
                            icons={<IoCallSharp />}
                            title="Emergency Call"
                            description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        />
                        <Card
                            icons={<FaUserMd />}
                            title="Search For Doctor"
                            description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        />
                    </div>
                </div>
            </div>
        </>
    );
}