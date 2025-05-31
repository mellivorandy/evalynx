import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function SidePanel({ auth }) {
    const [hoveringArchive, setHoveringArchive] = useState(false);

    return (
        <div className="fixed top-0 bottom-0 left-0 z-40">
            {/* Side panel container */}
            <div className="bg-[#81D8D0] text-white w-16 hover:w-52 transition-all duration-300 overflow-visible shadow-lg flex flex-col items-start h-full py-4 group">
                {/* 首頁 */}
                <Link
                    href="#welcome"
                    className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                >
                    <img
                        src="/images/home-page-icon.png"
                        alt="首頁"
                        className="w-7 h-8=7 mr-2"
                    />
                    <span className="whitespace-nowrap hidden group-hover:inline text-black dark:text-white">
                        首頁
                    </span>
                </Link>

                {/* 最新公告 */}
                <Link
                    href="#announcements"
                    className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                >
                    <img
                        src="/images/announcments.png"
                        alt="最新公告"
                        className="w-8 h-8 mr-2"
                    />
                    <span className="whitespace-nowrap hidden group-hover:inline text-black dark:text-white">
                        最新公告
                    </span>
                </Link>

                {/* 我要報名 */}
                {auth?.user?.role === "student" && (
                    <Link
                        href="/register/info"
                        className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                    >
                        <span className="material-icons mr-2">assignment</span>
                        <span className="whitespace-nowrap hidden group-hover:inline">
                            我要報名
                        </span>
                    </Link>
                )}

                {/* 評審專區 */}
                {auth?.user?.role === "judge" && (
                    <Link
                        href="/judge/score"
                        className="flex items-center w-full px-4 py-2 hover:bg-indigo-600"
                    >
                        <span className="material-icons mr-2">gavel</span>
                        <span className="whitespace-nowrap hidden group-hover:inline">
                            評審專區
                        </span>
                    </Link>
                )}

                {/* 歷屆作品 + 子選單 */}
                <div
                    className="relative w-full"
                    onMouseEnter={() => setHoveringArchive(true)}
                    onMouseLeave={() => setHoveringArchive(false)}
                >
                    <div className="flex items-center w-full px-4 py-2 hover:bg-indigo-600 cursor-pointer">
                        <img
                            src="/images/archive-icon.png"
                            alt="歷屆作品"
                            className="w-7 h-7 mr-2"
                        />
                        <span className="whitespace-nowrap hidden group-hover:inline text-black dark:text-white">
                            歷屆作品
                        </span>
                    </div>

                    {/* 子選單浮出，右側對齊 */}
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
        </div>
    );
}
