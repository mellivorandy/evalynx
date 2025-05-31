import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({ auth, notices }) {
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        if (selectedNotice) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        const esc = (e) => {
            if (e.key === "Escape") setSelectedNotice(null);
        };
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [selectedNotice]);

    return (
        <>
            <Head title="首頁 - 高大創新創意競賽" />
            <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white">
                <Header auth={auth} />

                <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
                    {/* 比賽海報 */}
                    <div className="flex justify-center">
                        <motion.img
                            src="/images/poster.png"
                            alt="高大創新創意競賽海報"
                            className="w-full max-w-[1152px] h-auto object-cover rounded shadow"
                            animate={{
                                scale: [1, 1.02, 1],
                                opacity: [1, 0.98, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* 功能導覽 */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        {auth?.user?.role && (
                            <Link
                                href="/notices"
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200"
                            >
                                <h2 className="font-semibold text-lg">
                                    公告查詢
                                </h2>
                                <p className="text-sm text-gray-600">
                                    查看最新比賽資訊
                                </p>
                            </Link>
                        )}

                        {auth?.user?.role && (
                            <Link
                                href="/login"
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200"
                            >
                                <h2 className="font-semibold text-lg">
                                    登入系統
                                </h2>
                                <p className="text-sm text-gray-600">
                                    管理或查看資料
                                </p>
                            </Link>
                        )}

                        {auth?.user?.role === "student" && (
                            <Link
                                href="/register/info"
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200"
                            >
                                <h2 className="font-semibold text-lg">
                                    我要報名
                                </h2>
                                <p className="text-sm text-gray-600">
                                    點我填寫報名資料
                                </p>
                            </Link>
                        )}

                        {auth?.user?.role === "judge" && (
                            <Link
                                href="/judge/score"
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200"
                            >
                                <h2 className="font-semibold text-lg">
                                    評審專區
                                </h2>
                                <p className="text-sm text-gray-600">
                                    填寫與查閱評分資料
                                </p>
                            </Link>
                        )}
                    </section>

                    {/* 最新公告 */}
                    <section id="announcements">
                        <h2 className="text-2xl font-bold mb-4">最新公告</h2>
                        <ul className="space-y-4">
                            {notices.map((notice) => (
                                <li
                                    key={notice.id}
                                    className="border-b pb-2 cursor-pointer"
                                    onClick={() => setSelectedNotice(notice)}
                                >
                                    <span className="text-blue-600 hover:underline">
                                        {notice.title}
                                    </span>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            notice.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>

                <Footer />

                {/* 模態視窗 */}
                <AnimatePresence>
                    {selectedNotice && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedNotice(null)}
                        >
                            {/* 背景模糊層 */}
                            <motion.div
                                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* 彈出視窗內容 */}
                            <motion.div
                                className="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded shadow-lg max-w-2xl w-full"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()} // 阻止點擊內容區關閉
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                                    onClick={() => setSelectedNotice(null)}
                                >
                                    &times;
                                </button>

                                <h2 className="text-xl font-bold mb-2">
                                    {selectedNotice.title}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                                    {selectedNotice.content}
                                </p>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
