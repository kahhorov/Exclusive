import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb } from "rsuite";
import { CiHeart } from "react-icons/ci";
import {
    IoArrowBack,
    IoBagHandleOutline,
    IoCartOutline,
    IoGiftOutline,
    IoHomeOutline,
    IoPricetagOutline,
} from "react-icons/io5";

const floatingItems = [
    { Icon: IoCartOutline, size: 40, depth: 40, duration: 6, delay: 0.2, className: "top-[10%] left-[6%] text-secondary-10/70" },
    { Icon: CiHeart, size: 48, depth: -30, duration: 7, delay: 0.5, className: "top-[14%] right-[8%] text-secondary-10/60" },
    { Icon: IoBagHandleOutline, size: 34, depth: -45, duration: 5.5, delay: 0.8, className: "bottom-[16%] left-[10%] text-gray-400" },
    { Icon: IoPricetagOutline, size: 32, depth: 35, duration: 6.5, delay: 1.1, className: "bottom-[20%] right-[6%] text-gray-400" },
    { Icon: IoGiftOutline, size: 30, depth: 25, duration: 8, delay: 1.4, className: "top-[48%] left-[2%] text-gray-300 hidden md:block" },
];

const digits = ["4", "0", "4"];

const Error404 = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const sceneRef = useRef(null);

    function handleMouseMove(e) {
        const rect = sceneRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        sceneRef.current.style.setProperty("--mx", x.toFixed(3));
        sceneRef.current.style.setProperty("--my", y.toFixed(3));
    }

    function handleMouseLeave() {
        sceneRef.current.style.setProperty("--mx", "0");
        sceneRef.current.style.setProperty("--my", "0");
    }

    function goBack() {
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
    }

    const parallax = (depth) => ({
        translate: `calc(var(--mx, 0) * ${depth}px) calc(var(--my, 0) * ${depth}px)`,
        transition: "translate 0.4s ease-out",
    });

    return (
        <div className="border-gray-300 border-t overflow-hidden">
            <div className="container px-4 py-10">
                <Breadcrumb aria-label="breadcrumb" className="!mb-0 motion-safe:animate-fade-in">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="text-black">404 Error</Breadcrumb.Item>
                </Breadcrumb>

                <div
                    ref={sceneRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative min-h-[70vh] flex flex-col items-center justify-center text-center py-16"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

                    <div className="pointer-events-none absolute inset-0" style={parallax(-20)}>
                        <div className="absolute top-[15%] left-[20%] w-64 h-64 rounded-full bg-secondary-10/10 blur-3xl motion-safe:animate-float" />
                        <div className="absolute bottom-[10%] right-[18%] w-72 h-72 rounded-full bg-star-10/10 blur-3xl motion-safe:animate-float [animation-delay:-2s]" />
                    </div>

                    {floatingItems.map(({ Icon, size, depth, duration, delay, className }, i) => (
                        <div
                            key={i}
                            className={`pointer-events-none absolute motion-safe:animate-fade-in ${className}`}
                            style={{ ...parallax(depth), animationDelay: `${delay}s` }}
                        >
                            <div
                                className="motion-safe:animate-float-tilt"
                                style={{ animationDuration: `${duration}s`, animationDelay: `-${delay}s` }}
                            >
                                <Icon size={size} />
                            </div>
                        </div>
                    ))}

                    <div className="relative select-none" aria-hidden="true" style={parallax(12)}>
                        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[110px] sm:text-[170px] lg:text-[210px] leading-none font-black tracking-tight">
                            {digits.map((digit, i) => (
                                <span
                                    key={i}
                                    className="inline-block motion-safe:animate-drop-in"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <span
                                        className="relative inline-block motion-safe:animate-float"
                                        style={{ animationDelay: `${0.9 + i * 0.4}s` }}
                                    >
                                        {i === 1 ? (
                                            <>
                                                <span className="text-secondary-10">{digit}</span>
                                                <span className="absolute inset-0 m-auto w-[0.95em] h-[0.95em] rounded-full border-2 border-dashed border-secondary-10/40 motion-safe:animate-spin-slow" />
                                                <span className="absolute inset-0 m-auto w-[0.95em] h-[0.95em] motion-safe:animate-orbit">
                                                    <span className="absolute top-0 left-1/2 w-[0.09em] h-[0.09em] -ml-[0.045em] -mt-[0.045em] rounded-full bg-secondary-10 shadow-[0_0_12px_rgba(219,68,68,0.8)]" />
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-black">{digit}</span>
                                        )}
                                    </span>
                                </span>
                            ))}
                        </div>

                        <div className="mx-auto mt-2 h-4 w-2/3 rounded-full bg-black blur-md opacity-20 motion-safe:animate-shadow" />
                    </div>

                    <h1
                        className="relative !mt-10 !mb-0 !text-3xl sm:!text-5xl !leading-tight !font-semibold tracking-wide motion-safe:animate-fade-up"
                        style={{ animationDelay: "0.6s" }}
                    >
                        404 Not Found
                    </h1>

                    <p
                        className="relative !mt-4 !mb-0 max-w-md text-gray-500 text-base motion-safe:animate-fade-up"
                        style={{ animationDelay: "0.75s" }}
                    >
                        Your visited page not found. You may go home page.
                    </p>

                    <div
                        className="relative mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-gray-10 px-4 py-1.5 text-sm text-gray-500 motion-safe:animate-fade-up"
                        style={{ animationDelay: "0.9s" }}
                    >
                        <span className="w-2 h-2 shrink-0 rounded-full bg-secondary-10 motion-safe:animate-pulse" />
                        <code className="break-all text-black">{pathname}</code>
                    </div>

                    <div
                        className="relative mt-10 flex flex-col sm:flex-row items-center gap-4 motion-safe:animate-fade-up"
                        style={{ animationDelay: "1.05s" }}
                    >
                        <div className="group relative transition-transform duration-300 hover:-translate-y-1 active:translate-y-0">

                            <span className="pointer-events-none absolute inset-0 rounded-sm border-2 border-secondary-10 opacity-0 motion-safe:animate-ring" />
                            <span className="pointer-events-none absolute inset-0 rounded-sm border-2 border-secondary-10 opacity-0 motion-safe:animate-ring [animation-delay:1s]" />

                            <Link
                                to="/"
                                className="relative overflow-hidden inline-flex items-center gap-3 !bg-secondary-10 hover:!bg-[#c73a3a] px-10 py-4 !rounded-sm !text-white hover:!text-white !no-underline hover:!no-underline focus:!no-underline font-medium shadow-lg shadow-secondary-10/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-secondary-10/50"
                            >
                                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-white/30 motion-safe:animate-shine-loop" />
                                <IoHomeOutline size={18} className="relative group-hover:animate-bounce" />
                                <span className="relative">Back to home page</span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={goBack}
                            className="group inline-flex items-center gap-2 px-8 py-4 !rounded-sm border border-black/20 bg-transparent font-medium transition-all duration-300 hover:border-black hover:-translate-y-1 active:translate-y-0"
                        >
                            <IoArrowBack size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error404;
