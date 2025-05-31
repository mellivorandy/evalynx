import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import "@/../css/app.css";

export default function LoginModal({ isOpen, onClose, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: () => {
                reset("password");
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.5 }}
                    onClick={onClose}
                >
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-20 particle"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${
                                        3 + Math.random() * 5
                                    }s`,
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        className="bg-white dark:bg-zinc-800 p-6 rounded shadow-lg max-w-md w-full relative z-10 overflow-hidden"
                        initial={{
                            scale: 0.7,
                            opacity: 0,
                            clipPath: "circle(0% at 50% 50%)",
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            clipPath: "circle(150% at 50% 50%)",
                        }}
                        exit={{
                            scale: 0.7,
                            opacity: 0,
                            clipPath: "circle(0% at 50% 50%)",
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.25, 1, 0.5, 1],
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute inset-0 bg-blue-300 opacity-20 blur-[80px] pointer-events-none"></div>

                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                            onClick={onClose}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">登入系統</h2>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="電子郵件" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="password" value="密碼" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-4 flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    記住我
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                {canResetPassword && (
                                    <a
                                        href={route("password.request")}
                                        className="text-sm text-gray-500 hover:underline"
                                    >
                                        忘記密碼？
                                    </a>
                                )}
                                <PrimaryButton disabled={processing}>
                                    登入
                                </PrimaryButton>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
