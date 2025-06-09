import React from "react";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";
import SidePanel from "@/Components/SidePanel";
import Footer from "@/Components/Footer";

export default function TeamInfo({ auth, team }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white">
            <Head title="我的隊伍" />
            <Header auth={auth} />

            <div className="flex flex-1">
                <SidePanel auth={auth} />
                <main className="flex-grow max-w-5xl mx-auto px-4 py-10">
                    <h1 className="text-3xl font-bold mb-8 text-center">
                        我的隊伍資訊
                    </h1>

                    {!team ? (
                        <p className="text-center text-gray-600">
                            你尚未加入任何隊伍。
                        </p>
                    ) : (
                        <>
                            <div className="space-y-8 bg-white dark:bg-zinc-800 shadow p-6 rounded-lg">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">
                                        隊伍名稱
                                    </h2>
                                    <p>{team.name}</p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-1">
                                        指導老師
                                    </h2>
                                    <p>
                                        {team.advisor?.name} (
                                        {team.advisor?.email})
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-1">
                                        作品資訊
                                    </h2>
                                    {team.project ? (
                                        <ul className="list-disc ml-6 space-y-1">
                                            <li>
                                                標題：
                                                {team.project?.[0]?.title?.trim()
                                                    ? team.project[0].title
                                                    : "（尚未填寫）"}
                                            </li>

                                            {team.project?.[0]?.title?.trim() ? (
                                                <>
                                                    <li>
                                                        標題：
                                                        {team.project[0].title}
                                                    </li>

                                                    {team.project[0]
                                                        .code_link && (
                                                        <li>
                                                            原始碼：
                                                            <a
                                                                href={
                                                                    team
                                                                        .project[0]
                                                                        .code_link
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 underline"
                                                            >
                                                                查看連結
                                                            </a>
                                                        </li>
                                                    )}

                                                    {team.project[0]
                                                        .proposal_path && (
                                                        <li>
                                                            企劃書（PDF）：
                                                            <a
                                                                href={`/storage/${team.project[0].proposal_path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 underline"
                                                            >
                                                                下載查看
                                                            </a>
                                                        </li>
                                                    )}

                                                    {team.project[0]
                                                        .poster_path && (
                                                        <li>
                                                            海報圖檔：
                                                            <img
                                                                src={`/storage/${team.project[0].poster_path}`}
                                                                alt="海報圖"
                                                                className="max-w-xs mt-2 border rounded"
                                                            />
                                                        </li>
                                                    )}
                                                </>
                                            ) : (
                                                <li>（尚未填寫）</li>
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">
                                            尚未提交作品。
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-1">
                                        隊員名單
                                    </h2>
                                    <ul className="list-disc ml-6 space-y-1">
                                        {team.members.map((member) => (
                                            <li key={member.id}>
                                                {member.user?.name}（
                                                {member.user?.email}）
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <a
                                    href="/"
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
                                >
                                    回首頁
                                </a>

                                <a
                                    href="/register/edit"
                                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
                                >
                                    編輯資料
                                </a>
                            </div>
                        </>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
