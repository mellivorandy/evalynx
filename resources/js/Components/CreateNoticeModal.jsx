import { router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CreateNoticeModal({ isOpen, onClose, onSuccess }) {
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    const initialForm = {
        title: "",
        content: "",
        event_date: getTodayDate(),
        prize: "",
        rules: "",
    };

    const [form, setForm] = useState(initialForm);

    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) setForm(initialForm);
    }, [isOpen]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("notices.store"), form, {
            preserveScroll: true,
            onSuccess: () => {
                onSuccess?.("公告已新增！");
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

                        <h2 className="text-xl font-bold mb-4">新增公告</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="標題"
                                value={form.title}
                                onChange={handleChange("title")}
                                required
                            />
                            <textarea
                                className="w-full p-2 border rounded"
                                rows={5}
                                placeholder="內容"
                                value={form.content}
                                onChange={handleChange("content")}
                                required
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
                                    儲存公告
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
