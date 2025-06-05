import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import { Head } from "@inertiajs/react";

export default function AdminNoticesIndex({ auth, notices }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("確定要刪除此公告嗎？")) {
            router.delete(route("notices.destroy", id));
        }
    };

    return (
        <>
            <Head title="公告管理" />
            <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-white">
                <Header auth={auth} />
                <SidePanel auth={auth} />

                <main className="max-w-5xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">公告管理</h1>

                    {flash.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex justify-end mb-6">
                        <Link
                            href={route("notices.create")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            新增公告
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {notices.data.map((notice) => (
                            <div
                                key={notice.id}
                                className="bg-white dark:bg-zinc-800 p-4 rounded shadow border border-gray-200 dark:border-zinc-600"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-semibold text-blue-600">
                                            {notice.title}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            發布日期：
                                            {new Date(
                                                notice.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route(
                                                "notices.edit",
                                                notice.id
                                            )}
                                            className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                                        >
                                            編輯
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(notice.id)
                                            }
                                            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {notice.content.length > 120
                                        ? notice.content.slice(0, 120) + "..."
                                        : notice.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                        {notices.links?.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                className={`px-3 py-1 border rounded text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                                    link.active
                                        ? "bg-indigo-600 text-white"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
