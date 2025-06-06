import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function EditNoticeModal({ notice, isOpen, onClose, onSuccess }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        event_date: "",
        prize: "",
        rules: "",
    });

    const modalRef = useRef(null);

    useEffect(() => {
        if (notice) {
            setForm({
                title: notice.title ?? "",
                content: notice.content ?? "",
                event_date: notice.event_date ?? "",
                prize: notice.prize ?? "",
                rules: notice.rules ?? "",
            });
        }
    }, [notice]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("notices.update", notice.id), form, {
            preserveState: true,
            onSuccess: () => {
                onSuccess?.("公告已更新！");
                onClose();
                router.reload({ only: ["notices"] });
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => {
                        if (modalRef.current && !modalRef.current.contains(e.target)) {
                            onClose();
                        }
                    }}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg w-full max-w-2xl relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl"
                            onClick={onClose}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">編輯公告</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="標題"
                                value={form.title}
                                onChange={handleChange("title")}
                            />
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={5}
                                placeholder="內容"
                                value={form.content}
                                onChange={handleChange("content")}
                            />
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={form.event_date}
                                onChange={handleChange("event_date")}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="獎金"
                                value={form.prize}
                                onChange={handleChange("prize")}
                            />
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="規則"
                                value={form.rules}
                                onChange={handleChange("rules")}
                            />

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-gray-500 hover:underline"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    儲存修改
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
