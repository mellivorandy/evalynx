import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import "@/../css/app.css";

export default function ForgotPasswordModal({ isOpen, onClose, status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"), {
            onSuccess: () => {
                onClose();
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
                >
                    <div
                        className="absolute inset-0 z-0"
                        onClick={onClose}
                    ></div>
                    
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

                        <h2 className="text-xl font-bold mb-4">重設密碼</h2>

                        <div className="mb-4 text-sm text-gray-600">
                            忘記密碼了嗎？別擔心。只要提供你的電子郵件地址，我們會
                            寄送一封密碼重設連結給你，讓你可以建立一組新的密碼。
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                >
                                    取得密碼重設連結
                                </PrimaryButton>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
