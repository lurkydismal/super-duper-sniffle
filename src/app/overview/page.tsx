"use client";

export default function Page() {
    const isDark = true;

    const paragraphColor = isDark ? "text-gray-100" : "text-gray-600";

    const containerBg = isDark
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-50 text-gray-900";

    return (
        <main
            className={`min-h-screen flex items-center justify-center ${containerBg} p-8 select-none`}
        >
            <div className="w-full max-w-3xl">
                <div className="mb-6">
                    <p className={paragraphColor}>OVERVIEW</p>
                </div>
            </div>
        </main>
    );
}
