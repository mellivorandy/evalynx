import React from 'react';
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";

export default function Index({ auth, teams = [] }) {
  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white min-h-screen relative">
      <Header auth={auth} />
      <SidePanel auth={auth} />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <h1 className="text-2xl font-bold mb-8">我的指導隊伍與學生作品</h1>
        {teams.length === 0 ? (
          <p>目前沒有您的指導隊伍。</p>
        ) : (
          teams.map(team => (
            <div
              key={team.id}
              className="mb-8 p-6 border border-gray-300 rounded-lg bg-white dark:bg-zinc-700"
            >
              <h2 className="text-lg font-semibold mb-2">隊伍：{team.name}（ID: {team.id}）</h2>
              <h3 className="font-medium">學生名單：</h3>
              <ul className="mb-2 list-disc list-inside">
                {team.teammembers && team.teammembers.length > 0 ? (
                  team.teammembers.map(member => (
                    <li key={member.id}>
                      學號：{member.user_id}
                      {member.user ? `，姓名：${member.user.name}（${member.user.email}）` : '，未知學生'}
                    </li>
                  ))
                ) : (
                  <li>尚無學生資料</li>
                )}
              </ul>
              <h3 className="font-medium">作品列表：</h3>
              <ul className="list-disc list-inside">
                {team.projects && team.projects.length > 0 ? (
                  team.projects.map(project => (
                    <li key={project.id}>
                      {project.title}
                      {project.proposal_path && (
                        <> | 企劃書：<a href={project.proposal_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">下載</a></>
                      )}
                      {project.poster_path && (
                        <> | 海報：<a href={project.poster_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">下載</a></>
                      )}
                      {project.code_link && (
                        <> | 程式碼：<a href={project.code_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">檢視</a></>
                      )}
                    </li>
                  ))
                ) : (
                  <li>尚無作品</li>
                )}
              </ul>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}
