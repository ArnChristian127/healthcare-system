"use client";
import { useEffect } from "react";
export default function Contact() {
    useEffect(() => {
        document.title = "Healthcare - Contact";
    });
    return (
        <>
            <div className="relative bg-[url('/app-page/home/bg.jpg')] bg-cover bg-center text-white px-6 py-20 md:py-25 lg:py-30">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container mx-auto sm:px-5 md:px-10 lg:px-15">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mt-3">Contact Us</h1>
                </div>
            </div>
            <div className="px-6 py-10">
                <div className="container mx-auto px-6 sm:px-5 md:px-10 lg:px-15 space-y-5">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
                        Reach Us
                    </h1>
                    <textarea
                        className="p-3 px-3 rounded-lg w-full border border-gray-300 outline-none"
                        placeholder="Enter your name"
                    />
                    <div className="flex items-center gap-5">
                        <input
                            className="p-3 px-3 rounded-lg w-full border border-gray-300 outline-none"
                            placeholder="Enter your name"
                        />
                        <input
                            className="p-3 px-3 rounded-lg w-full border border-gray-300 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <input
                        className="p-3 px-3 rounded-lg w-full border border-gray-300 outline-none"
                        placeholder="Enter your subject"
                    />
                    <button className="px-8 py-2 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white rounded-sm font-medium cursor-pointer mt-3 transition duration-200">Send</button>
                </div>
            </div>
        </>
    )
}