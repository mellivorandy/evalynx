import { useState, useEffect } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import LoginModal from "@/Components/LoginModal";
import RegisterModal from "@/Components/RegisterModal";
import SidePanel from "@/Components/SidePanel";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({ auth, notices }) {
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

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
            <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white min-h-screen relative">
                <Header
                    auth={auth}
                    onLoginClick={() => setShowLoginModal(true)}
                    onRegisterClick={() => setShowRegisterModal(true)}
                />
                <SidePanel auth={auth} />

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

                    {/* 最新公告區塊 */}
                    <motion.section
                        id="announcements"
                        className="bg-indigo-50 dark:bg-zinc-900 rounded-lg p-6 shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-white">
                            最新公告
                        </h2>
                        <ul className="space-y-2">
                            {notices.map((notice) => (
                                <motion.li
                                    key={notice.id}
                                    className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-zinc-700 cursor-pointer"
                                    onClick={() => setSelectedNotice(notice)}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow:
                                            "0 4px 20px rgba(0, 0, 0, 0.1)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 15,
                                    }}
                                >
                                    <h3 className="text-blue-600 font-semibold text-base hover:underline">
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(
                                            notice.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>
                </main>

                <Footer />

                {/* 模態公告視窗 */}
                <AnimatePresence>
                    {selectedNotice && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedNotice(null)}
                        >
                            {/* 背景模糊遮罩 */}
                            <motion.div
                                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* 彈窗內容 */}
                            <motion.div
                                className="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded shadow-lg max-w-2xl w-full"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl"
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

                <RegisterModal
                    isOpen={showRegisterModal}
                    onClose={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setTimeout(() => setShowLoginModal(true), 300);
                    }}
                />
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    canResetPassword={true}
                />
            </div>
        </>
    );
}
