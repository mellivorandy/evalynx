import React, { useState } from 'react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";
import { Head, Link, usePage, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import Edit from './Edit';


const scoreHeaders = [
    { key: 'score1', label: '創意', tooltip: '創意與構想' },
    { key: 'score2', label: '品質', tooltip: '技術實作與程式碼品質' },
    { key: 'score3', label: '美觀', tooltip: '美術設計與使用體驗' },
    { key: 'score4', label: '完整度', tooltip: '完整度與展示效果' },
];

// 彈窗編輯表單
function EditJudgeModal({ show, onClose, judge = {}, projects = [], teams = [] }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        id: judge.id ?? '',
        team_id: judge.team_id ?? '',
        title: judge.title ?? '',
        description: judge.description ?? '',
        team_name: judge.team_name ?? '',
        completed: judge.completed ?? false,
        score1: judge.score1 ?? 0,
        score2: judge.score2 ?? 0,
        score3: judge.score3 ?? 0,
        score4: judge.score4 ?? 0,
    });

    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        setTotal(
            scoreHeaders.reduce((sum, h) => sum + Number(data[h.key] || 0), 0)
        );
    }, [data]);

    const handleProjectChange = (e) => {
        const selectedId = e.target.value;
        setData('id', selectedId);
        const project = projects.find((p) => String(p.id) === String(selectedId));
        setData('team_id', project ? project.team_id : '');
        setData('title', project ? project.title : '');
        const team = teams.find((t) => String(t.id) === String(project ? project.team_id : ''));
        setData('team_name', team ? team.name : '');
    };

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('judges.update', judge.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white dark:bg-zinc-700 rounded shadow space-y-6">
                <h2 className="text-xl font-bold mb-4">編輯評審成績</h2>
                {/* 作品選擇 */}
                <div>
                    <label className="block mb-1 font-medium">作品ID <span className="text-red-500">*</span></label>
                    <select
                        name="id"
                        value={data.id}
                        onChange={handleProjectChange}
                        className="w-full border rounded px-2 py-1 dark:text-black"
                        required
                    >
                        <option value="">請選擇作品</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {`ID:${p.id}`}
                            </option>
                        ))}
                    </select>
                    {errors.id && <div className="text-red-500 text-sm">{errors.id}</div>}
                </div>
                {data.team_id && (
                    <div>
                        <label className="block mb-1 font-medium">team_ID</label>
                        <input
                            type="text"
                            name="team_id"
                            value={data.team_id}
                            readOnly
                            className="w-full border rounded px-2 py-1 dark:text-black bg-gray-100"
                        />
                    </div>
                )}
                {data.title && (
                    <div>
                        <label className="block mb-1 font-medium">作品 *</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            readOnly
                            className="w-full border rounded px-2 py-1 dark:text-black bg-gray-100"
                        />
                    </div>
                )}
                {data.team_name && (
                    <div>
                        <label className="block mb-1 font-medium">隊伍名稱</label>
                        <input
                            type="text"
                            name="team_name"
                            value={data.team_name}
                            readOnly
                            className="w-full border rounded px-2 py-1 dark:text-black bg-gray-100"
                        />
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="completed"
                        checked={data.completed}
                        onChange={handleChange}
                        id="completed"
                    />
                    <label htmlFor="completed" className="font-medium">已完成評審</label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {scoreHeaders.map((h) => (
                        <div key={h.key}>
                            <label className="block mb-1 font-medium">
                                {h.label} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name={h.key}
                                value={data[h.key]}
                                onChange={handleChange}
                                min={0}
                                max={25}
                                className="w-full border rounded px-2 py-1 dark:text-black"
                                required
                            />
                            {errors[h.key] && <div className="text-red-500 text-sm">{errors[h.key]}</div>}
                        </div>
                    ))}
                </div>
                <div className="text-right font-bold text-lg">
                    總分：{total} / 100
                </div>
                <div>
                    <label className="block mb-1 font-medium">評論</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 dark:text-black"
                        rows={2}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        取消
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        disabled={processing}
                    >
                        儲存
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default function Index({ auth, judges, projects = [], teams = [] }) {
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [editingJudge, setEditingJudge] = useState(null);

    const calculateTotalScore = (judge) => {
        return (judge.score1 || 0) + (judge.score2 || 0) + (judge.score3 || 0) + (judge.score4 || 0);
    };

    const openEditModal = (judge) => {
        setEditingJudge(judge);
        setShowModal(true);
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
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">標題</th>
                                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">隊伍</th>
                                                {scoreHeaders.map(h => (
                                                    <th
                                                        key={h.key}
                                                        className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                                        title={h.tooltip}
                                                        style={{ minWidth: 60 }}
                                                    >
                                                        {h.label}
                                                    </th>
                                                ))}
                                                <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">總分</th>
                                                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" style={{ minWidth: 180 }}>評論</th>
                                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">狀態</th>
                                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">建立</th>
                                                <th className="relative px-3 py-2"><span className="sr-only">操作</span></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {judges.map((judge) => (
                                                <tr key={judge.id}>
                                                    <td className="px-3 py-2 whitespace-nowrap font-medium">{judge.id}</td>
                                                    <td className="px-3 py-2 whitespace-nowrap">{judge.title}</td>
                                                    <td className="px-3 py-2 whitespace-nowrap">{judge.team_name}</td>
                                                    {scoreHeaders.map(h => (
                                                        <td key={h.key} className="px-2 py-2 whitespace-nowrap text-right">{judge[h.key] ?? 'N/A'}</td>
                                                    ))}
                                                    <td className="px-2 py-2 whitespace-nowrap text-right font-semibold">{calculateTotalScore(judge)}</td>
                                                    <td className="px-6 py-2 whitespace-nowrap text-left" style={{ maxWidth: 320, wordBreak: 'break-all', whiteSpace: 'pre-line' }}>
                                                        {judge.description ? judge.description : <span className="text-gray-400">無</span>}
                                                    </td>
                                                    <td className="px-3 py-2 whitespace-nowrap text-center">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${judge.completed ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'}`}>
                                                            {judge.completed ? '已完成' : '未完成'}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 whitespace-nowrap text-center text-gray-500 dark:text-gray-400">{new Date(judge.created_at).toLocaleDateString()}</td>
                                                    <td className="px-3 py-2 whitespace-nowrap text-right font-medium">
                                                        <button
                                                            className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 mr-3"
                                                            onClick={() => openEditModal(judge)}
                                                        >
                                                            編輯
                                                        </button>
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
               
                {/* 彈窗編輯表單 */}
                <Edit
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  judge={editingJudge}
                  projects={projects}
                  teams={teams}
                />
            </div>
        </>
    );
}
