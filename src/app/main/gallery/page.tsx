"use client";
import { useEffect } from "react";
export default function Gallery() {
    useEffect(() => {
        document.title = "Healthcare - Gallery";
    });
    const pictures = [];
    for (let i = 1; i <= 8; i++) {
        pictures.push(
            <div className="w-full h-[200px] md:h-[250px] lg:h-[300px]">
                <img className="w-full h-full object-cover" src={`https://technext.github.io/chiropractic/images/work-${i}.jpg`} alt={`Gallery ${i}`}/>
            </div>
        );
    }
    return (
        <>
            <div className="relative bg-[url('/app-page/home/bg.jpg')] bg-cover bg-center text-white px-6 py-20 md:py-25 lg:py-30">
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container mx-auto sm:px-5 md:px-10 lg:px-15">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mt-3">Gallery</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {pictures}
            </div>
        </>
    )
}