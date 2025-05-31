import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Welcome({ auth, notices }) {
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
                    <section>
                        <h2 className="text-2xl font-bold mb-4">最新公告</h2>
                        <ul className="space-y-4">
                            {notices.map((notice) => (
                                <li key={notice.id} className="border-b pb-2">
                                    <Link
                                        href={`/notices/${notice.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {notice.title}
                                    </Link>
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
            </div>
        </>
    );
}
