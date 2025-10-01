export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-5 rounded-lg">
        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 border-3 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
