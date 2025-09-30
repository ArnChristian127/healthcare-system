type CardDoctorProps = {
    children: React.ReactNode;
    name: string;
    src: string;
    alt: string;
}
export default function CardDoctors({ children, src = '', alt = '', name = '' }: CardDoctorProps) {
    return (
        <div className="shadow-lg rounded-md border border-gray-300">
            <img src={src} alt={alt} className="w-90 rounded-t-2xl h-[300px] md:h-[350px] lg:h-[400px] object-cover" />
            <div className="p-5 bg-white border-t border-gray-300 rounded-md text-center">
                <h1 className="text-md sm:text-lg md:text-xl font-semibold text-teal-400">
                    {name}
                </h1>
                {children}
            </div>
        </div>
    )
}