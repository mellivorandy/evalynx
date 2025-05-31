import { Head, Link } from '@inertiajs/react';

export default function Index({ notices }) {
    return (
        <>
            <Head title="公告查詢" />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-indigo-700 mb-6">公告查詢</h1>

                <ul className="space-y-4">
                    {notices.map(notice => (
                        <li key={notice.id} className="border-b pb-2">
                            <Link
                                href={`/notices/${notice.id}`}
                                className="text-blue-600 hover:underline text-lg"
                            >
                                {notice.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                                {new Date(notice.created_at).toLocaleDateString()}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
