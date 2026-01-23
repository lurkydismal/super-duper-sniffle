export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isDark = true;

    const containerBg = isDark
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-50 text-gray-900";

    return (
        <main
            className={`min-h-screen flex items-center justify-center ${containerBg} p-8 select-none`}
        >
            {children}
        </main>
    );
}
