import React, { useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import NoticeQueryModal from "@/Components/NoticeQueryModal";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Dashboard({ auth, notices }) {
    const [showNoticeModal, setShowNoticeModal] = useState(false);

    return (
        <>
            <Head title="管理員專區" />
            <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-white">
                <Header auth={auth} />
                <SidePanel auth={auth} />
                <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
                    <h1 className="text-3xl font-bold">管理員專區</h1>
                    <p className="text-lg">歡迎，{auth.user.name}！</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                            onClick={() => setShowNoticeModal(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded shadow text-center cursor-pointer"
                        >
                            公告管理
                        </div>

                        <a
                            href="/teams"
                            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded shadow text-center block"
                        >
                            隊伍總覽
                        </a>

                        <a
                            href="/scores"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded shadow text-center block"
                        >
                            評分總表
                        </a>
                    </div>
                </main>
                <Footer />

                <NoticeQueryModal
                    notices={notices ?? []}
                    isOpen={showNoticeModal}
                    onClose={() => setShowNoticeModal(false)}
                    isAdmin={auth.user.role === "admin"}
                />
            </div>
        </>
    );
}
