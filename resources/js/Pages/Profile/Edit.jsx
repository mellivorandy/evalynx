import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { motion } from "framer-motion";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="個人資料" />

            <div className="bg-white text-gray-900 dark:bg-zinc-900 dark:text-white min-h-screen relative transition-colors">
                <Header auth={auth} />
                <SidePanel auth={auth} />

                <main className="max-w-6xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold mb-8">個人資料</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700 border p-6 shadow sm:rounded-lg w-full transition-colors"
                        >
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </motion.div>

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700 border p-6 shadow sm:rounded-lg w-full transition-colors"
                            >
                                <UpdatePasswordForm className="w-full" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-700 border p-6 shadow sm:rounded-lg w-full transition-colors"
                            >
                                <DeleteUserForm className="w-full" />
                            </motion.div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
