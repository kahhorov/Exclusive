import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-6 overflow-hidden">
            <div className="relative w-full max-w-4xl text-center">

                {/* Background blur circles */}
                <div className="absolute -top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />

                <div className="relative">

                    {/* 404 */}
                    <div className="select-none">
                        <h1 className="text-[150px] sm:text-[200px] md:text-[250px] leading-none font-black tracking-[-0.08em] text-transparent bg-clip-text bg-gradient-to-br from-[#1B2A41] via-[#315A8C] to-[#7DB7FF]">
                            404
                        </h1>
                    </div>

                    {/* Small badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-medium text-gray-600">
                            Page not found
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
                        Oops! Bu sahifa topilmadi
                    </h2>

                    {/* Description */}
                    <p className="mt-4 max-w-lg mx-auto text-gray-500 text-base sm:text-lg leading-7">
                        Siz izlayotgan sahifa o‘chirilgan, manzili o‘zgargan
                        yoki vaqtincha mavjud emas.
                    </p>

                    {/* Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => navigate("/")}
                            className="
                                group
                                flex items-center gap-3
                                px-6 py-3.5
                                !rounded-2xl
                                bg-[#1B2A41]
                                !text-white
                                font-semibold
                                shadow-lg shadow-[#1B2A41]/20
                                hover:bg-[#243957]
                                hover:-translate-y-1
                                active:translate-y-0
                                transition-all duration-300
                            "
                        >
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>

                            Back to Home
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Error404;