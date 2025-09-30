type CardProps = {
  icons: any;
  title: string;
  description: string;
};
export default function Card({ icons, title, description }: CardProps) {
  return (
    <>
      <div className="bg-white p-5 rounded-md shadow border border-gray-300 flex justify-center items-center text-center flex-col gap-5">
        <div className="w-10 h-10 md:h-15 md:w-15 lg:h-20 lg:w-20 bg-teal-400 flex justify-center items-center text-white rounded-full">
          <div className="text-2xl md:text-3xl lg:text-4xl">{icons}</div>
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium">{title}</h1>
        <p>{description}</p>
      </div>
    </>
  );
}