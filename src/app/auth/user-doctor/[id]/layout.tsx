export function PatientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="font-bold">
            {children}
        </div>
    )
}