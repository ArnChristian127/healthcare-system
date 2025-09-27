"use client";
import { useState } from "react";
import Navbar from "@/components/app-page/navbar/Navbar";
import ModalAuthentication from "@/components/app-page/modals/ModalAuthentication";
import Footer from "@/components/app-page/footer/FooterHome";

export default function WrapperApp({ children }: { children: React.ReactNode }) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div className={`text-sm mt-15 text-gray-700`}>
            {isOpenModal && (
                <ModalAuthentication onClick={setIsOpenModal} />
            )}
            <Navbar
                setOpenModal={setIsOpenModal}
                links={[
                    { href: "/main/", label: "HOME" },
                    { href: "/main/about", label: "ABOUT" },
                    { href: "/main/gallery", label: "GALLERY" },
                    { href: "/main/contact", label: "CONTACT" },
                ]}
            />
            {children}
            <Footer/>
        </div>
    );
}