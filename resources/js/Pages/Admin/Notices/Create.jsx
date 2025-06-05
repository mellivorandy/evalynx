import { useForm } from "@inertiajs/react";

export default function NoticeCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        event_date: "",
        prize: "",
        rules: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("notices.store"));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-xl font-bold mb-4">新增公告</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="標題"
                    className="w-full border p-2 rounded"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && (
                    <div className="text-red-500">{errors.title}</div>
                )}

                <textarea
                    placeholder="內容"
                    className="w-full border p-2 rounded h-32"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                />
                {errors.content && (
                    <div className="text-red-500">{errors.content}</div>
                )}

                <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={data.event_date}
                    onChange={(e) => setData("event_date", e.target.value)}
                />

                <input
                    type="text"
                    placeholder="獎金/名次"
                    className="w-full border p-2 rounded"
                    value={data.prize}
                    onChange={(e) => setData("prize", e.target.value)}
                />

                <textarea
                    placeholder="競賽規則"
                    className="w-full border p-2 rounded h-24"
                    value={data.rules}
                    onChange={(e) => setData("rules", e.target.value)}
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    儲存公告
                </button>
            </form>
        </div>
    );
}
