import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, Head, router } from "@inertiajs/react";

export default function RegisterTeamModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [localErrors, setLocalErrors] = useState({});
    const { data, setData, post, processing, errors } = useForm({
        team_name: "",
        advisor_email: "",
        title: "",
        proposal_path: null,
        poster_path: null,
        code_link: "",
        teammates: [""],
    });

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

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
        post("/register-team", {
            forceFormData: true,
            onSuccess: () => {
                router.visit("/my-team");
            },
            onError: (err) => {
                console.error("送出失敗", err);
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
                    onMouseDown={handleBackdropClick}
                >
                    <motion.div
                        className="relative bg-white dark:bg-zinc-800 rounded-2xl w-full max-w-4xl z-10 shadow-lg overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        <div
                            ref={modalRef}
                            className="p-6 overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl"
                            >
                                &times;
                            </button>

                            <Head title="隊伍報名" />
                            <h1 className="text-2xl font-bold mb-6 text-center">
                                學生隊伍報名
                            </h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <section>
                                    <h2 className="text-lg font-semibold mb-2">
                                        基本資料
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputField
                                            label="隊伍名稱"
                                            value={data.team_name}
                                            onChange={(val) =>
                                                setData("team_name", val)
                                            }
                                            error={errors.team_name}
                                        />
                                        <InputField
                                            label="指導老師 Email"
                                            type="email"
                                            value={data.advisor_email}
                                            onChange={(val) =>
                                                setData("advisor_email", val)
                                            }
                                            error={errors.advisor_email}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-semibold mb-2">
                                        作品資訊
                                    </h2>
                                    <InputField
                                        label="作品標題"
                                        value={data.title}
                                        onChange={(val) =>
                                            setData("title", val)
                                        }
                                        error={errors.title}
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FileInput
                                            label="企劃書（PDF）"
                                            name="proposal_path"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            error={errors.proposal_path}
                                        />
                                        <FileInput
                                            label="海報圖檔"
                                            name="poster_path"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            error={errors.poster_path}
                                        />
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-semibold mb-2">
                                        延伸資訊
                                    </h2>
                                    <InputField
                                        label="程式碼連結"
                                        value={data.code_link}
                                        onChange={(val) =>
                                            setData("code_link", val)
                                        }
                                        error={
                                            errors.code_link ||
                                            localErrors.code_link
                                        }
                                    />
                                </section>

                                <div>
                                    <label className="block font-semibold mb-2">
                                        其他隊員 Email（選填）
                                    </label>
                                    {data.teammates.map((email, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 mb-2"
                                        >
                                            <input
                                                type="text"
                                                className="w-full border p-2 rounded"
                                                value={email}
                                                onChange={(e) => {
                                                    const updated = [
                                                        ...data.teammates,
                                                    ];
                                                    updated[index] =
                                                        e.target.value;
                                                    setData(
                                                        "teammates",
                                                        updated
                                                    );
                                                }}
                                            />
                                            {data.teammates.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-600 text-sm"
                                                    onClick={() => {
                                                        const updated =
                                                            data.teammates.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            );
                                                        setData(
                                                            "teammates",
                                                            updated
                                                        );
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
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
                                        className="mt-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm shadow transition"
                                    >
                                        ＋ 新增隊員欄位
                                    </button>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setData({
                                                team_name: "",
                                                advisor_email: "",
                                                title: "",
                                                proposal_path: null,
                                                poster_path: null,
                                                code_link: "",
                                                teammates: [""],
                                            });
                                            setLocalErrors({});
                                        }}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
                                    >
                                        清除資料
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        提交報名
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const InputField = ({ label, value, onChange, error, type = "text" }) => (
    <div>
        <label className="block font-semibold">{label}</label>
        <input
            type={type}
            className="w-full border p-2 rounded"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

const FileInput = ({ label, name, accept, onChange, error }) => (
    <div>
        <label className="block font-semibold mb-1">{label}</label>
        <input
            type="file"
            name={name}
            accept={accept}
            onChange={onChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);
