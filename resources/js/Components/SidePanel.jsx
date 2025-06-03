import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function SidePanel({ auth }) {
    const [hoveringArchive, setHoveringArchive] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const darkMode = localStorage.getItem("theme") === "dark";
        setIsDark(darkMode);
        document.documentElement.classList.toggle("dark", darkMode);
    }, []);

    useEffect(() => {
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 z-40">
            <div className="bg-[#81D8D0] text-white w-16 hover:w-52 transition-all duration-300 overflow-visible shadow-lg flex flex-col h-full py-4 group">
                <div className="flex flex-col items-start space-y-4 flex-grow">
                    <Link
                        href="/"
                        className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                    >
                        <img
                            src="/images/home-page-icon.png"
                            alt="首頁"
                            className="w-7 h-7 mr-2"
                        />
                        <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            首頁
                        </span>
                    </Link>

                    <Link
                        href="#announcements"
                        className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                    >
                        <img
                            src="/images/announcments-icon.png"
                            alt="最新公告"
                            className="w-8 h-8 mr-2"
                        />
                        <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            最新公告
                        </span>
                    </Link>

                    {auth?.user?.role === "student" && (
                        <Link
                            href="/register/info"
                            className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                        >
                            <img
                                src="/images/registration-icon.png"
                                alt="報名"
                                className="w-8 h-8 mr-2"
                            />
                            <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                我要報名
                            </span>
                        </Link>
                    )}

                    {auth?.user?.role === "admin" && (
                        <Link
                            href="/judge/score"
                            className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                        >
                            <img
                                src="/images/admin-icon.png"
                                alt="管理員專區"
                                className="w-8 h-8 mr-2"
                            />
                            <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                管理員專區
                            </span>
                        </Link>
                    )}

                    {auth?.user?.role === "judge" && (
                        <Link
                            href="/judge/score"
                            className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                        >
                            <img
                                src="/images/judge-icon.png"
                                alt="評審專區"
                                className="w-8 h-8 mr-2"
                            />
                            <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                評審專區
                            </span>
                        </Link>
                    )}

                    <div
                        className="relative w-full"
                        onMouseEnter={() => setHoveringArchive(true)}
                        onMouseLeave={() => setHoveringArchive(false)}
                    >
                        <div className="flex items-center w-full px-3.5 py-2 hover:bg-indigo-600 cursor-pointer">
                            <img
                                src="/images/archive-icon.png"
                                alt="歷屆作品"
                                className="w-8 h-8 mr-2"
                            />
                            <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                歷屆作品
                            </span>
                        </div>
                        <div
                            className={`absolute top-0 left-full ml-2 bg-white text-black dark:bg-zinc-800 dark:text-white rounded shadow-lg transition-all duration-300 w-40 z-50 ${
                                hoveringArchive
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible"
                            }`}
                        >
                            {[2024, 2023, 2022, 2021, 2020].map((year) => (
                                <Link
                                    key={year}
                                    href={`/works/${year}`}
                                    className="block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-zinc-700 whitespace-nowrap"
                                >
                                    {year} 年作品
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full px-3.5 mb-2">
                    <button
                        onClick={toggleTheme}
                        className="group w-full flex items-center px-1 py-2 hover:bg-indigo-600 rounded transition-all duration-300"
                    >
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 transform transition-all duration-500">
                            <img
                                src={
                                    isDark
                                        ? "/images/sun-icon.png"
                                        : "/images/moon-icon.png"
                                }
                                alt="切換主題"
                                className={`h-7 w-7 transition-transform duration-500 ease-in-out transform ${
                                    isDark ? "rotate-[360deg]" : "rotate-[0deg]"
                                } group-hover:animate-bounceOnce`}
                            />
                        </div>
                        <span className="ml-2 text-black dark:text-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {isDark ? "淺色模式" : "深色模式"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
