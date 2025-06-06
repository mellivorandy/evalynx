import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    個人資訊
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    更新您的帳號資訊和電子郵件地址。確保您的個人資訊是最新的，以便我們可以聯繫您。
                    如果您更改了電子郵件地址，請記得驗證新的電子郵件地址。
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="姓名"
                        className="text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError
                        className="mt-2 text-red-600 dark:text-red-400"
                        message={errors.name}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="電子郵件"
                        className="text-gray-700 dark:text-gray-300"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError
                        className="mt-2 text-red-600 dark:text-red-400"
                        message={errors.email}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                            您的電子郵件地址尚未驗證。
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ml-1 underline text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                            >
                                點擊這裡重新發送驗證郵件
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                驗證郵件已發送。
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>更新</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">
                            更改成功。
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
