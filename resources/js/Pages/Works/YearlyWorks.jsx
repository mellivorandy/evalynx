import React from "react";
import { Head } from "@inertiajs/react";

export default function YearlyWorks({ projects, year }) {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <Head title={`${year} 年歷屆作品`} />
            <h1 className="text-3xl font-bold mb-6">{year} 年歷屆作品</h1>
            {projects.length === 0 ? (
                <p>尚無作品資料。</p>
            ) : (
                <ul className="space-y-4">
                    {projects.map((project) => (
                        <li
                            key={project.id}
                            className="border rounded p-4 bg-white dark:bg-zinc-800"
                        >
                            <h2 className="text-xl font-semibold">
                                {project.title}
                            </h2>
                            <p className="text-sm text-gray-600">
                                團隊：{project.team_name}
                            </p>
                            <p className="mt-2">{project.description}</p>
                            {project.code_link && (
                                <a
                                    href={project.code_link}
                                    target="_blank"
                                    className="text-blue-600 underline mt-2 block"
                                >
                                    查看程式碼
                                </a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
