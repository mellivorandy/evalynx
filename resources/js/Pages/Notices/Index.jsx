import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ notices }) {
    const [keyword, setKeyword] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [selectedNotice, setSelectedNotice] = useState(null);

    const years = useMemo(() => {
        const uniqueYears = new Set();
        notices.forEach((n) => {
            const year = new Date(n.created_at).getFullYear();
            uniqueYears.add(year);
        });
        return [...uniqueYears].sort((a, b) => b - a);
    }, [notices]);

    const filtered = useMemo(() => {
        return notices.filter((notice) => {
            const content = (notice.title + notice.content).toLowerCase();
            const matchKeyword = content.includes(keyword.toLowerCase());
            const matchYear = yearFilter
                ? new Date(notice.created_at).getFullYear().toString() === yearFilter
                : true;
            return matchKeyword && matchYear;
        });
    }, [keyword, yearFilter, notices]);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold text-indigo-700">公告查詢</h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="輸入關鍵字搜尋"
                    className="border p-2 rounded w-full"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <select
                    className="border p-2 rounded w-full sm:w-40"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                >
                    <option value="">全部年份</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y} 年</option>
                    ))}
                </select>
            </div>

            <ul className="space-y-4">
                {filtered.length === 0 ? (
                    <p className="text-gray-500">找不到符合的公告。</p>
                ) : (
                    filtered.map((notice) => (
                        <li
                            key={notice.id}
                            className="bg-white p-4 rounded shadow border border-gray-200 cursor-pointer"
                            onClick={() => setSelectedNotice(notice)}
                        >
                            <h3 className="text-lg font-semibold text-blue-600">{notice.title}</h3>
                            <p className="text-sm text-gray-500">
                                發布日期：{new Date(notice.created_at).toLocaleDateString()}
                            </p>
                        </li>
                    ))
                )}
            </ul>

            <AnimatePresence>
                {selectedNotice && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedNotice(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        />

                        <motion.div
                            className="relative z-10 bg-white dark:bg-zinc-800 p-6 rounded shadow-lg max-w-2xl w-full"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                                onClick={() => setSelectedNotice(null)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-2">{selectedNotice.title}</h2>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                {selectedNotice.content}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
