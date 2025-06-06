import { useForm, Head, Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";

export default function Edit({ auth, notice }) {
    const { data, setData, put, processing, errors } = useForm({
        title: notice.title,
        content: notice.content,
        event_date: notice.event_date ?? "",
        prize: notice.prize ?? "",
        rules: notice.rules ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("notices.update", notice.id));
    };

    return (
        <>
            <Head title="編輯公告" />
            <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-800 dark:text-white">
                <Header auth={auth} />
                <SidePanel auth={auth} />

                <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                    <h1 className="text-3xl font-bold mb-6">編輯公告</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium">標題</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded dark:bg-zinc-900"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">內容</label>
                            <textarea
                                className="w-full p-2 border rounded dark:bg-zinc-900"
                                rows={6}
                                value={data.content}
                                onChange={(e) => setData("content", e.target.value)}
                            />
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">活動日期</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded dark:bg-zinc-900"
                                    value={data.event_date}
                                    onChange={(e) => setData("event_date", e.target.value)}
                                />
                                {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">獎金</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded dark:bg-zinc-900"
                                    value={data.prize}
                                    onChange={(e) => setData("prize", e.target.value)}
                                />
                                {errors.prize && <p className="text-red-500 text-sm mt-1">{errors.prize}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">規則</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded dark:bg-zinc-900"
                                    value={data.rules}
                                    onChange={(e) => setData("rules", e.target.value)}
                                />
                                {errors.rules && <p className="text-red-500 text-sm mt-1">{errors.rules}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                            >
                                儲存修改
                            </button>
                            <Link
                                href={route("admin.notices.index")}
                                className="text-gray-600 hover:underline"
                            >
                                返回列表
                            </Link>
                        </div>
                    </form>
                </main>

                <Footer />
            </div>
        </>
    );
}
