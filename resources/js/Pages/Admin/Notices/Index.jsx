import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import NoticeQueryModal from "@/Components/NoticeQueryModal";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNoticesIndex({ auth, notices }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState("");
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id) => {
        if (confirm("確定要刪除此公告嗎？")) {
            router.delete(route("notices.destroy", id), {
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const filtered = notices.data.filter(
        (notice) =>
            notice.title.includes(search) || notice.content.includes(search)
    );

    const openModal = (notice) => {
        setSelectedNotice(notice);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedNotice(null);
        setShowModal(false);
    };

    return (
        <>
            <Head title="公告管理" />
            <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-white">
                <Header auth={auth} />
                <SidePanel auth={auth} />

                <main className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">公告管理</h1>

                    {flash?.success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 p-4 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded"
                        >
                            {flash.success}
                        </motion.div>
                    )}

                    <div className="flex justify-between items-center mb-6 gap-2 flex-wrap">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="輸入公告關鍵字..."
                            className="flex-1 p-2 border rounded dark:bg-zinc-900"
                        />
                        <Link
                            href={route("notices.create")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            新增公告
                        </Link>
                    </div>

                    {filtered.map((notice) => (
                        <motion.div
                            key={notice.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                            }}
                            whileTap={{ scale: 0.96 }}
                            className="bg-yellow-100 dark:bg-zinc-700 p-4 rounded flex justify-between items-center hover:bg-yellow-200 dark:hover:bg-zinc-600 transition-all duration-200 shadow cursor-pointer"
                            onClick={() => openModal(notice)}
                        >
                            <div>
                                <h3 className="text-zinc-800 font-semibold text-base dark:text-white hover:underline">
                                    {notice.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    發布日期：
                                    {new Date(
                                        notice.created_at
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </main>

                <Footer />

                <NoticeQueryModal
                    notices={selectedNotice ? [selectedNotice] : []}
                    isOpen={showModal}
                    onClose={closeModal}
                    onSelect={setSelectedNotice}
                    isAdmin={true}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
}
