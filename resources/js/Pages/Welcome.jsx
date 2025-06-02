import { useState, useEffect, useRef } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import LoginModal from "@/Components/LoginModal";
import RegisterModal from "@/Components/RegisterModal";
import NoticeQueryModal from "@/Components/NoticeQueryModal";
import SidePanel from "@/Components/SidePanel";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome({ auth, notices }) {
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showNoticeModal, setShowNoticeModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const noticeModalRef = useRef(null);
    const [pageDirection, setPageDirection] = useState(0);

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

    const handlePageChange = (newPage) => {
        setPageDirection(newPage > notices.current_page ? 1 : -1);
        router.visit(`/?page=${newPage}#announcements`, {
            preserveScroll: true,
            preserveState: true,
        });
    };

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
                            <motion.div
                                className="bg-amber-200 p-4 rounded shadow hover:bg-amber-300 text-center flex flex-col items-center justify-center h-28 cursor-pointer"
                                whileHover={{
                                    rotateY: 360,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => setShowNoticeModal(true)}
                            >
                                <h2 className="font-semibold text-lg">
                                    公告查詢
                                </h2>
                                <p className="text-sm text-gray-600">
                                    查看最新比賽資訊
                                </p>
                            </motion.div>
                        )}

                        {auth?.user?.role === "student" && (
                            <Link
                                href="/register/info"
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200 transition-all duration-300 transform hover:animate-wiggle text-center flex flex-col items-center justify-center h-28"
                            >
                                <h2 className="font-semibold text-lg">
                                    我要報名
                                </h2>
                                <p className="text-sm text-gray-600">
                                    點我填寫報名資料
                                </p>
                            </Link>
                        )}

                        {auth?.user?.role === "admin" && (
                            <motion.div
                                className="bg-amber-200 p-4 rounded shadow hover:bg-amber-300 text-center flex flex-col items-center justify-center h-28 cursor-pointer"
                                whileHover={{
                                    rotateY: 360,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => setShowNoticeModal(true)}
                            >
                                <h2 className="font-semibold text-lg">
                                    管理員專區
                                </h2>
                                <p className="text-sm text-gray-600">
                                    管理系統與公告
                                </p>
                            </motion.div>
                        )}

                        {auth?.user?.role === "judge" && (
                            <motion.div
                                className="bg-indigo-100 p-4 rounded shadow hover:bg-indigo-200 text-center flex flex-col items-center justify-center h-28 cursor-pointer"
                                whileHover={{
                                    rotateY: 360,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                onClick={() => setShowNoticeModal(true)}
                            >
                                <h2 className="font-semibold text-lg">
                                    評審專區
                                </h2>
                                <p className="text-sm text-gray-600">
                                    填寫與查閱評分資料
                                </p>
                            </motion.div>
                        )}
                    </section>

                    {/* 最新公告區塊 */}
                    <motion.section
                        id="announcements"
                        className="bg-indigo-300 dark:bg-zinc-900 rounded-lg p-6 shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-white">
                            最新公告
                        </h2>

                        <AnimatePresence mode="wait">
                            <motion.ul
                                key={notices.current_page}
                                className="space-y-2"
                                initial={{
                                    x: pageDirection > 0 ? 300 : -300,
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{
                                    x: pageDirection > 0 ? -300 : 300,
                                    opacity: 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                            >
                                {notices.data.map((notice, index) => (
                                    <motion.li
                                        key={notice.id}
                                        className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm border border-gray-200 dark:border-zinc-700 cursor-pointer"
                                        onClick={() =>
                                            setSelectedNotice(notice)
                                        }
                                        initial={{
                                            x: pageDirection > 0 ? 100 : -100,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            x: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            x: pageDirection > 0 ? -100 : 100,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: index * 0.05,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow:
                                                "0 6px 24px rgba(0,0,0,0.15)",
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 18,
                                            },
                                        }}
                                        whileTap={{ scale: 0.96 }}
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
                            </motion.ul>
                        </AnimatePresence>

                        {notices.last_page > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <motion.button
                                    onClick={() =>
                                        handlePageChange(
                                            notices.current_page - 1
                                        )
                                    }
                                    disabled={!notices.prev_page_url}
                                    className="px-4 py-2 rounded-md font-semibold text-white disabled:opacity-35 shadow-md"
                                    style={{
                                        backgroundColor: "#fca503",
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        backgroundColor: "#ec8f00",
                                        boxShadow:
                                            "0px 4px 12px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    &lt; 上一頁
                                </motion.button>

                                <span className="text-lg font-medium text-black-700 dark:text-white">
                                    第 {notices.current_page} 頁 / 共{" "}
                                    {notices.last_page} 頁
                                </span>

                                <motion.button
                                    onClick={() =>
                                        handlePageChange(
                                            notices.current_page + 1
                                        )
                                    }
                                    disabled={!notices.next_page_url}
                                    className="px-4 py-2 rounded-md font-semibold text-white disabled:opacity-35 shadow-md"
                                    style={{
                                        backgroundColor: "#fca503",
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        backgroundColor: "#ec8f00",
                                        boxShadow:
                                            "0px 4px 12px rgba(0,0,0,0.2)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 15,
                                    }}
                                >
                                    下一頁 &gt;
                                </motion.button>
                            </div>
                        )}
                    </motion.section>
                </main>

                <Footer />

                {/* 模糊公告視窗 */}
                <AnimatePresence>
                    {selectedNotice && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onMouseDown={(e) => {
                                if (
                                    noticeModalRef.current &&
                                    !noticeModalRef.current.contains(e.target)
                                ) {
                                    setSelectedNotice(null);
                                }
                            }}
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
                                ref={noticeModalRef}
                                className="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded shadow-lg max-w-2xl w-full"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
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

                <NoticeQueryModal
                    notices={notices.data}
                    isOpen={showNoticeModal}
                    onClose={() => setShowNoticeModal(false)}
                    onSelect={(notice) => setSelectedNotice(notice)}
                />
            </div>
        </>
    );
}
