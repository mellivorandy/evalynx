import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Megaphone, Users, ScrollText, ArrowRight } from "lucide-react";
import NoticeQueryModal from "@/Components/NoticeQueryModal";

export default function TeacherDashboard() {
    const { auth, notices = [] } = usePage().props;

    const [showNoticeModal, setShowNoticeModal] = useState(false);

    const cards = [
        {
            icon: <Megaphone className="text-pink-600" size={28} />,
            title: "公告查詢",
            description: "查看最新比賽資訊",
            onClick: () => setShowNoticeModal(true),
        },
        {
            icon: <Users className="text-indigo-600" size={28} />,
            title: "我的隊伍",
            description: "查看指導隊伍作品",
            href: "/teacher/my-teams",
        },
        {
            icon: <ScrollText className="text-yellow-600" size={28} />,
            title: "歷屆作品",
            description: "查看歷屆作品",
            href: "/works",
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 bg-[length:400%_400%] animate-gradient dark:from-zinc-900 dark:to-black overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-200 rounded-full opacity-20 blur-2xl animate-pulse"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold mb-6">
                    <span className="text-blue-700">{auth.user.name}</span>{" "}
                    老師，歡迎回來！
                </h1>

                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow space-y-4">
                    {cards.map(
                        ({ icon, title, description, href, onClick }) => {
                            const content = (
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-100 dark:bg-zinc-600 rounded-full p-3">
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                            {title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            );

                            return onClick ? (
                                <div
                                    key={title}
                                    onClick={onClick}
                                    className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:shadow-lg transition-transform hover:scale-[1.01] hover:bg-gray-50 dark:hover:bg-zinc-700"
                                >
                                    {content}
                                    <ArrowRight className="text-gray-400" />
                                </div>
                            ) : (
                                <Link
                                    key={title}
                                    href={href}
                                    className="flex items-center justify-between p-4 rounded-lg hover:shadow-lg transition-transform hover:scale-[1.01] hover:bg-gray-50 dark:hover:bg-zinc-700"
                                >
                                    {content}
                                    <ArrowRight className="text-gray-400" />
                                </Link>
                            );
                        }
                    )}
                </div>
            </div>

            <NoticeQueryModal
                isOpen={showNoticeModal}
                onClose={() => setShowNoticeModal(false)}
                isAdmin={true}
                notices={notices}
            />
        </div>
    );
}
