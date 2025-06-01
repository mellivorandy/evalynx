import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function NoticeQueryModal({ notices, isOpen, onClose, onSelect }) {
    const [search, setSearch] = useState("");
    const [filterYear, setFilterYear] = useState("all");

    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const filtered = notices.filter((notice) => {
        const year = new Date(notice.created_at).getFullYear().toString();
        return (
            (notice.title.includes(search) || notice.content.includes(search)) &&
            (filterYear === "all" || year === filterYear)
        );
    });

    const yearOptions = Array.from(
        new Set(notices.map((n) => new Date(n.created_at).getFullYear().toString()))
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        className="relative bg-white dark:bg-zinc-800 p-6 rounded-lg max-w-3xl w-full z-10 overflow-auto max-h-[90vh]"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                            onClick={onClose}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">
                            公告查詢
                        </h2>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="輸入關鍵字搜尋"
                                className="flex-1 p-2 border rounded"
                            />
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="p-2 pr-8 border rounded appearance-none"
                            >
                                <option value="all">全部年份</option>
                                {yearOptions.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <ul className="space-y-2">
                            {filtered.map((notice) => (
                                <li
                                    key={notice.id}
                                    className="bg-yellow-100 dark:bg-zinc-700 p-4 rounded cursor-pointer hover:bg-yellow-200 dark:hover:bg-zinc-600"
                                    onClick={() => {
                                        onSelect(notice);
                                        onClose();
                                    }}
                                >
                                    <h3 className="font-bold text-black-800 dark:text-white">
                                        {notice.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        發布日期：{new Date(notice.created_at).toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
