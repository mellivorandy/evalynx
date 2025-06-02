import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UnifiedJudgePage({ auth, errors: pageServerErrors, judges: initialJudges = [], scores: initialScores = [] }) {
    // 表單 1: 新增評審員 (Judge)
    const { data: judgeData, setData: setJudgeData, post: postJudge, errors: judgeFormErrors, processing: judgeProcessing, recentlySuccessful: judgeRecentlySuccessful, reset: resetJudgeForm } = useForm({
        title: '',
        description: '',
        completed: false,
    });

    // 表單 2: 提交評分 (Score)
    const { data: scoreData, setData: setScoreData, post: postScore, errors: scoreFormErrors, processing: scoreProcessing, recentlySuccessful: scoreRecentlySuccessful, reset: resetScoreForm } = useForm({
        participantId: '',
        criteria1: 0,
        criteria2: 0,
        criteria3: 0,
        criteria4: 0,
        comments: '',
        // judge_id: auth.user.id, // 假設評分與當前登入用戶關聯，或者從 prop 傳入 judge
    });

    const [currentJudges, setCurrentJudges] = useState(initialJudges);
    const [submittedScores, setSubmittedScores] = useState(initialScores);
    const [currentScoreTotal, setCurrentScoreTotal] = useState(0);

    // 更新已有的 judges 列表，如果後端在成功新增 judge 後返回了更新的列表
    useEffect(() => {
        if (pageServerErrors?.judges) { // 假設 Inertia 共享 props 中有名為 judges 的鍵
             setCurrentJudges(pageServerErrors.judges);
        }
    }, [pageServerErrors?.judges]);


    // 計算評分表單的總分
    useEffect(() => {
        const total =
            Number(scoreData.criteria1 || 0) +
            Number(scoreData.criteria2 || 0) +
            Number(scoreData.criteria3 || 0) +
            Number(scoreData.criteria4 || 0);
        setCurrentScoreTotal(total);
    }, [scoreData.criteria1, scoreData.criteria2, scoreData.criteria3, scoreData.criteria4]);

    // 提交新增評審員表單
    const handleJudgeSubmit = (e) => {
        e.preventDefault();
        postJudge(route('judges.store'), { // 提交到 JudgeController@store
            onSuccess: (page) => {
                resetJudgeForm();
                // 如果後端在 props.judges 中返回了更新的列表
                if (page.props.judges) {
                    setCurrentJudges(page.props.judges);
                } else {
                    // 否則，我們可能需要手動將新創建的 judge 添加到 currentJudges
                    // 這需要後端在成功時返回新創建的 judge 資料
                    // 或者重新 fetch judges 列表 (不推薦，Inertia 應自動處理)
                    // 簡單起見，這裡假設 Inertia 會在 props 中返回更新的列表
                }
            }
        });
    };

    // 提交評分表單
    const handleScoreSubmit = (e) => {
        e.preventDefault();
        postScore(route('scores.store'), { // 假設路由名為 'scores.store'
            onSuccess: (page) => {
                resetScoreForm();
                if (page.props.scores) { // 假設後端在 props.scores 中返回了更新的列表
                    setSubmittedScores(page.props.scores);
                }
            }
        });
    };

    const handleScoreCriteriaChange = (e) => {
        const { name, value } = e.target;
        let numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) numericValue = 0;
        else if (numericValue < 0) numericValue = 0;
        else if (numericValue > 25) numericValue = 25;
        setScoreData(name, numericValue);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    評審管理與評分
                </h2>
            }
        >
            <Head title="評審管理與評分" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-12">

                    {/* 區域 1: 新增評審員 */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                            新增評審員 (Judge)
                        </h2>
                        {judgeRecentlySuccessful && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">評審員已成功新增！</div>
                        )}
                        <form onSubmit={handleJudgeSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="judge_title" className="block text-sm font-medium">標題 <span className="text-red-500">*</span></label>
                                <input
                                    type="text" id="judge_title" value={judgeData.title}
                                    onChange={(e) => setJudgeData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600" required
                                />
                                {judgeFormErrors.title && <p className="text-red-500 text-xs mt-1">{judgeFormErrors.title}</p>}
                            </div>
                            <div>
                                <label htmlFor="judge_description" className="block text-sm font-medium">描述</label>
                                <textarea
                                    id="judge_description" value={judgeData.description}
                                    onChange={(e) => setJudgeData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                                ></textarea>
                                {judgeFormErrors.description && <p className="text-red-500 text-xs mt-1">{judgeFormErrors.description}</p>}
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="judge_completed" type="checkbox" checked={judgeData.completed}
                                    onChange={(e) => setJudgeData('completed', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="judge_completed" className="ml-2 block text-sm">是否完成</label>
                            </div>
                            <div>
                                <button type="submit" disabled={judgeProcessing} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                                    {judgeProcessing ? '儲存中...' : '儲存評審員'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* 區域 2: 評分表單 */}
                    <section className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">
                            填寫評分資料 (Score)
                        </h2>
                        {scoreRecentlySuccessful && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">評分已成功提交！</div>
                        )}
                        <form onSubmit={handleScoreSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="participantId" className="block text-sm font-medium">參賽者ID / 隊伍名稱:</label>
                                <input
                                    type="text" id="participantId" value={scoreData.participantId}
                                    onChange={(e) => setScoreData('participantId', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-zinc-700 dark:border-zinc-600" required
                                />
                                {scoreFormErrors.participantId && <p className="text-red-500 text-xs mt-1">{scoreFormErrors.participantId}</p>}
                            </div>
                            <fieldset className="space-y-4 border dark:border-zinc-700 p-4 rounded-md">
                                <legend className="text-lg font-medium px-2">評分項目 (每項最高25分)</legend>
                                {['criteria1', 'criteria2', 'criteria3', 'criteria4'].map((criterion, index) => (
                                    <div key={criterion}>
                                        <label htmlFor={criterion} className="block text-sm font-medium">標準 {index + 1}:</label>
                                        <input
                                            type="number" name={criterion} id={criterion} value={scoreData[criterion]}
                                            onChange={handleScoreCriteriaChange} min="0" max="25"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-zinc-700 dark:border-zinc-600" required
                                        />
                                        {scoreFormErrors[criterion] && <p className="text-red-500 text-xs mt-1">{scoreFormErrors[criterion]}</p>}
                                    </div>
                                ))}
                            </fieldset>
                            <div className="mt-4 p-3 bg-indigo-50 dark:bg-zinc-700 rounded-md text-right">
                                <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">目前總分: {currentScoreTotal} / 100</span>
                            </div>
                            <div>
                                <label htmlFor="comments" className="block text-sm font-medium">評語:</label>
                                <textarea
                                    id="comments" value={scoreData.comments}
                                    onChange={(e) => setScoreData('comments', e.target.value)} rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-zinc-700 dark:border-zinc-600"
                                ></textarea>
                                {scoreFormErrors.comments && <p className="text-red-500 text-xs mt-1">{scoreFormErrors.comments}</p>}
                            </div>
                            <div>
                                <button type="submit" disabled={scoreProcessing} className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50">
                                    {scoreProcessing ? '提交中...' : '提交評分'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* 區域 3: 顯示評審員列表 (可選) */}
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">現有評審員列表</h2>
                        {currentJudges.length === 0 ? <p>尚無評審員資料。</p> : (
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {currentJudges.map(judge => (
                                    <li key={judge.id} className="py-3">
                                        <h3 className="font-medium">{judge.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{judge.description}</p>
                                        <p className="text-xs">{judge.completed ? '已完成' : '未完成'}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                     {/* 區域 4: 顯示已提交評分列表 (可選) */}
                    <section className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">已提交評分記錄</h2>
                        {submittedScores.length === 0 ? <p>尚無評分記錄。</p> : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    {/* ... 表格結構同 JudgeScorePage.jsx ... */}
                                     <thead className="bg-gray-50 dark:bg-zinc-700">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase">參賽者ID</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase">總分</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium uppercase">評語</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
                                        {submittedScores.map((score) => (
                                            <tr key={score.id || `s-${score.participantId}-${Math.random()}`}>
                                                <td className="px-4 py-2 whitespace-nowrap">{score.participantId}</td>
                                                <td className="px-4 py-2 whitespace-nowrap">{score.totalScore}</td>
                                                <td className="px-4 py-2 whitespace-pre-wrap">{score.comments}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
