"use client";
import { useState } from "react";
import Navbar from "@/components/app-page/navbar/Navbar";
import ModalAuthentication from "@/components/app-page/modals/ModalAuthentication";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <html lang="en">
      <body className="text-sm mt-15 text-gray-700">
        {isOpenModal && (
          <ModalAuthentication onClick={setIsOpenModal}/>
        )}
        <Navbar
          setOpenModal={setIsOpenModal}
          links={[
            { href: "/", label: "HOME" },
            { href: "/about", label: "ABOUT" },
            { href: "/gallery", label: "GALLERY" },
            { href: "/contact", label: "CONTACT" },
          ]}
        />
        {children}
        <footer className="bg-slate-800 px-6 py-20">
          <div className="flex justify-center items-center mx-auto container flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="flex flex-col">
                <div className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  Healthcare System
                </div>
                <hr className="border-t border-gray-600 my-5" />
                <div className="text-sm md:text-base lg:text-lg text-gray-300">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  Our Departments
                </div>
                <hr className="border-t border-gray-600 my-5" />
                <div className="text-sm md:text-base lg:text-lg text-gray-300 grid grid-cols-2">
                  <a href="#" className="hover:text-teal-400 focus:text-teal-400">lorem ipsum</a>
                  <a href="#" className="hover:text-teal-400 focus:text-teal-400">lorem ipsum</a>
                  <a href="#" className="hover:text-teal-400 focus:text-teal-400">lorem ipsum</a>
                  <a href="#" className="hover:text-teal-400 focus:text-teal-400">lorem ipsum</a>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                  We're Available
                </div>
                <hr className="border-t border-gray-600 my-5" />
                <div className="text-sm md:text-base lg:text-lg text-gray-300 flex flex-col gap-3">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-600 my-15 w-full" />
            <div className="text-sm md:text-base lg:text-lg text-gray-300 text-center">
              &copy; {new Date().getFullYear()} Healthcare System. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}