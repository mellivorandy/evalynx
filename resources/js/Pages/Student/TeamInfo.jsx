import React from "react";
import { Head } from "@inertiajs/react";

export default function TeamInfo({ team }) {
    return (
        <div className="max-w-4xl mx-auto py-10">
            <Head title="我的隊伍" />

            <h1 className="text-3xl font-bold mb-6">我的隊伍資訊</h1>

            {!team ? (
                <p className="text-gray-600">你尚未加入任何隊伍。</p>
            ) : (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">隊伍名稱</h2>
                        <p>{team.name}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">指導老師</h2>
                        <p>
                            {team.advisor?.name} ({team.advisor?.email})
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">作品資訊</h2>
                        {team.project ? (
                            <ul className="list-disc ml-6">
                                <li>標題：{team.project.title}</li>
                                {team.project.code_link && (
                                    <li>
                                        原始碼：{" "}
                                        <a
                                            href={team.project.code_link}
                                            target="_blank"
                                            className="text-blue-600 underline"
                                        >
                                            查看連結
                                        </a>
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <p className="text-gray-500">尚未提交作品。</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold">隊員名單</h2>
                        <ul className="list-disc ml-6">
                            {team.members.map((member) => (
                                <li key={member.id}>
                                    {member.user?.name}（{member.user?.email}）
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
