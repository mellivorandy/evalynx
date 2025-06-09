import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";

export default function EditTeamModal({
    isOpen,
    onClose,
    team,
    self_id,
    self_email,
}) {
    const [localErrors, setLocalErrors] = useState({});
    const { data, setData, post, processing, errors } = useForm({
        team_name: team.name || "",
        advisor_email: team.advisor?.email || "",
        title: team.project?.[0]?.title || "",
        code_link: team.project?.[0]?.code_link || "",
        teammates: team.members
            ?.filter((m) => m.user?.id !== self_id)
            .map((m) => m.user?.email) || [""],
        proposal_path: null,
        poster_path: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const errs = {};
        if (data.code_link.trim() !== "") {
            try {
                new URL(data.code_link);
            } catch {
                errs.code_link = "請輸入合法的網址";
            }
        }

        if (Object.keys(errs).length > 0) {
            setLocalErrors(errs);
            return;
        }

        setLocalErrors({});
        const formData = new FormData();
        formData.append("team_name", data.team_name);
        formData.append("advisor_email", data.advisor_email);
        formData.append("title", data.title);
        formData.append("code_link", data.code_link ?? "");
        if (data.proposal_path)
            formData.append("proposal_path", data.proposal_path);
        if (data.poster_path) formData.append("poster_path", data.poster_path);
        data.teammates.forEach((email, index) =>
            formData.append(`teammates[${index}]`, email)
        );

        post("/register/update", formData, {
            forceFormData: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm px-4 py-10 flex justify-center items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    layout
                    className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-3xl z-10 shadow"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                        aria-label="關閉編輯"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>

                    <Head title="編輯參賽資料" />
                    <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
                        編輯隊伍與作品資訊
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 隊伍名稱 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                隊伍名稱
                            </label>
                            <input
                                type="text"
                                className="w-full border p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                value={data.team_name}
                                onChange={(e) =>
                                    setData("team_name", e.target.value)
                                }
                            />
                            {errors.team_name && (
                                <p className="text-red-500 text-sm">
                                    {errors.team_name}
                                </p>
                            )}
                        </div>

                        {/* 指導老師 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                指導老師 Email
                            </label>
                            <input
                                type="email"
                                className="w-full border p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                value={data.advisor_email}
                                onChange={(e) =>
                                    setData("advisor_email", e.target.value)
                                }
                            />
                            {errors.advisor_email && (
                                <p className="text-red-500 text-sm">
                                    {errors.advisor_email}
                                </p>
                            )}
                        </div>

                        {/* 標題 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                作品標題
                            </label>
                            <input
                                type="text"
                                className="w-full border p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* 程式碼連結 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                程式碼連結
                            </label>
                            <input
                                type="text"
                                className="w-full border p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                value={data.code_link}
                                onChange={(e) =>
                                    setData("code_link", e.target.value)
                                }
                            />
                            {(localErrors.code_link || errors.code_link) && (
                                <p className="text-red-500 text-sm">
                                    {localErrors.code_link || errors.code_link}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">
                                報名者 Email（必填）
                            </label>
                            <input
                                type="email"
                                value={self_email}
                                disabled
                                className="w-full border p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:text-white cursor-not-allowed"
                            />
                        </div>

                        {/* 隊員 Email */}
                        <div>
                            <label className="block font-semibold mb-2">
                                其他隊員 Email（選填）
                            </label>
                            {data.teammates.map((email, index) => (
                                <div
                                    key={index}
                                    className="flex items-center mb-2 gap-2"
                                >
                                    <input
                                        type="text"
                                        className="flex-1 border p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 dark:text-white"
                                        value={email}
                                        onChange={(e) => {
                                            const updated = [...data.teammates];
                                            updated[index] = e.target.value;
                                            setData("teammates", updated);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updated = [...data.teammates];
                                            updated.splice(index, 1);
                                            setData("teammates", updated);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                        title="移除此隊員"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() =>
                                    setData("teammates", [
                                        ...data.teammates,
                                        "",
                                    ])
                                }
                                className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                            >
                                + 新增隊員欄位
                            </button>
                        </div>

                        {/* 上傳企劃書 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                企劃書（PDF）
                            </label>
                            <input
                                type="file"
                                name="proposal_path"
                                accept="application/pdf"
                                className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                onChange={(e) =>
                                    setData("proposal_path", e.target.files[0])
                                }
                            />
                            {errors.proposal_path && (
                                <p className="text-red-500 text-sm">
                                    {errors.proposal_path}
                                </p>
                            )}
                        </div>

                        {/* 上傳海報圖 */}
                        <div>
                            <label className="block font-semibold mb-1">
                                海報圖檔
                            </label>
                            <input
                                type="file"
                                name="poster_path"
                                accept="image/png, image/jpeg"
                                className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-orange-50 file:text-orange-700
                                                hover:file:bg-orange-100"
                                onChange={(e) =>
                                    setData("poster_path", e.target.files[0])
                                }
                            />
                            {errors.poster_path && (
                                <p className="text-red-500 text-sm">
                                    {errors.poster_path}
                                </p>
                            )}
                        </div>

                        {/* 提交按鈕 */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
                            >
                                更新資料
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
