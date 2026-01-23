"use client";

export default function Page() {
    const isDark = true;

    const paragraphColor = isDark ? "text-gray-100" : "text-gray-600";

    return (
        <div className="w-full max-w-3xl">
            <div className="mb-6">
                <p className={paragraphColor}>
                    GETTIER
                </p>
            </div>
        </div>
    );
}
