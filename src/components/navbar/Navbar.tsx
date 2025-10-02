//Step 4 Creating frontend for main
//You can also see this in main > layout.tsx
/*
    If you notice the differences this is still javascript but with typescript
    a wider version of javascript that allows us to use types
    and make our code more readable and maintainable similar to java
*/
"use client";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import Link from "next/link";

//declaring the specific type for the links and label and make it as an array
type LinkList = {
    href: string;
    label: string;
}
//same as this one but on links is just connected to LinkList
//we also typing the void for the setOpenModal so that those properties are can only be declared
type NavbarProps = {
    links?: LinkList[];
    setOpenModal: (v: boolean) => void;
}
export default function Navbar({ links, setOpenModal }: NavbarProps) {
    //declaring hook state for mobile menu
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* desktop menu */}
            <nav className="px-6 py-4 bg-slate-700 text-white fixed top-0 w-full z-50">
                <div className="container mx-auto flex justify-between items-center sm:px-6 md:px-10 lg:px-15">
                    <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">
                        Healthcare
                    </h1>
                    <ul className="lg:flex gap-15 hidden font-medium">
                        {/* instead we create a lot of links we can make it dynamic and declare in layout.tsx*/}
                        {links?.map((items, index) => (
                            <li key={index}>
                                <Link href={items.href} className="hover:text-teal-400 focus:text-teal-400">
                                    {items.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* LOGIN button this will trigger the modal from components > modals > ModalAuthentication*/}
                    <button onClick={() => setOpenModal(true)} className="px-4 py-2 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white rounded-sm hidden lg:block font-medium cursor-pointer transition duration-200">
                        LOGIN
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white px-1 py-1 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 rounded-sm cursor-pointer transition duration-200">
                        <BsList className="text-xl" />
                    </button>
                </div>
            </nav>
            {/* mobile menu */}
            {isOpen && (
                <nav className="px-6 py-4 bg-slate-800 text-white fixed top-15 w-full z-40 lg:hidden rounded-b-2xl">
                    <div className="container mx-auto sm:px-6 md:px-10 lg:px-15">
                        <ul className="lg:flex space-y-4 font-medium">
                            {links?.map((items, index) => (
                                <li key={index}>
                                    <Link href={items.href} className="hover:text-teal-400 focus:text-teal-400">
                                        {items.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* LOGIN button this will trigger the modal from components > modals > ModalAuthentication*/}
                        <button onClick={() => {setOpenModal(true); setIsOpen(false)}} className="px-4 py-2 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 text-white rounded-sm font-medium cursor-pointer mt-4 transition duration-200">
                            LOGIN
                        </button>
                    </div>
                </nav>
            )}
        </>
    );
}