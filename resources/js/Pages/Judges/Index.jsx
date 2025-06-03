import React from 'react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, judges }) {
    const { flash } = usePage().props;

    const calculateTotalScore = (judge) => {
        return (judge.score1 || 0) + (judge.score2 || 0) + (judge.score3 || 0) + (judge.score4 || 0);
    };

    return (
        <>
            <Head title="評審列表與評分" />
            <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white min-h-screen relative">
                <Header auth={auth} />
                <SidePanel auth={auth} />

                <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight mb-6">
                        評審列表與評分
                    </h2>
                    {flash && flash.success && (
                        <div className="mb-4 p-4 bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded">
                            {flash.success}
                        </div>
                    )}
                    {flash && flash.error && (
                        <div className="mb-4 p-4 bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded">
                            {flash.error}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex space-x-2">
                                <Link
                                    href={route('judges.create')}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
                                >
                                    新增評審項目/評分
                                </Link>
                            </div>
                            {judges && judges.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">標題</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">描述</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">隊伍名稱</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score1</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score2</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score3</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score4</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">總分</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">狀態</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">創建時間</th>
                                                <th className="relative px-6 py-3"><span className="sr-only">操作</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {judges.map((judge) => (
                                                <tr key={judge.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{judge.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{judge.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{judge.description ? judge.description.substring(0, 30) + (judge.description.length > 30 ? '...' : '') : 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{judge.team_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{judge.score1 ?? 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{judge.score2 ?? 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{judge.score3 ?? 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{judge.score4 ?? 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold">{calculateTotalScore(judge)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${judge.completed ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'}`}>
                                                            {judge.completed ? '已完成' : '未完成'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(judge.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link href={route('judges.show', judge.id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">查看</Link>
                                                        <Link href={route('judges.edit', judge.id)} className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-3">編輯</Link>
                                                        <Link href={route('judges.destroy', judge.id)} method="delete" as="button" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300" onBefore={() => confirm('您確定要刪除此評審項目嗎?')}>刪除</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>目前沒有評審項目。</p>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
