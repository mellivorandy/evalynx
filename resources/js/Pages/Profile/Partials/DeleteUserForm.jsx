import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({ password: "" });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    刪除帳號
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    一旦刪除帳號，所有資源和數據將被永久刪除。在刪除帳號之前，請下載任何您希望保留的數據或訊息。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>刪除帳號</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form
                    onSubmit={deleteUser}
                    className="p-6 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white rounded"
                >
                    <h2 className="text-lg font-medium">
                        你確定要刪除你的帳號嗎？
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        一旦刪除帳號，所有資源和數據將被永久刪除。在刪除帳號之前，請下載任何您希望保留的數據或訊息。
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="密碼"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                            isFocused
                            placeholder="密碼"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-red-600 dark:text-red-400"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            取消
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            刪除帳號
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
