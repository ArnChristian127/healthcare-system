type ErrorProps = {
  status: string | null;
  icons: any;
  isRed?: boolean;
};
export default function ErrorMessage({
  icons,
  status,
  isRed = false,
}: ErrorProps) {
  return (
    <div
      className={`flex items-center gap-3 border ${
        isRed ? "border-red-400" : "border-green-400"
      } p-2 rounded-md`}
    >
      {icons}
      <p className={`${isRed ? "text-red-400" : "text-green-400"}`}>{status}</p>
    </div>
  );
}