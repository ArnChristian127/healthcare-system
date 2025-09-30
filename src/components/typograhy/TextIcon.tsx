type TextIconProps = {
  icon: any;
  text: string;
};
export default function TextIcon({ icon, text }: TextIconProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        {icon}
        <p>{text}</p>
      </div>
    </>
  );
}