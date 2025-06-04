import React, { useState } from 'react';
import { router } from '@inertiajs/react';

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";

export default function WorksIndex({ works, filters, auth }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('works.index'), { search });
  };

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white min-h-screen relative">
      <Header auth={auth} />
      <SidePanel auth={auth} />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8 flex space-x-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜尋標題"
            className="flex-1 border rounded px-3 py-2 dark:text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            搜尋
          </button>
        </form>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-separate border-spacing-0 bg-white dark:bg-zinc-700 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800">
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 w-16 rounded-tl-lg">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 w-24">隊伍ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 w-48">標題</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 w-24">企劃書</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 w-24">海報</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 w-32">程式碼連結</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200 w-40 rounded-tr-lg">建立時間</th>
              </tr>
            </thead>
            <tbody>
              {works.data.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-300">查無資料</td>
                </tr>
              )}
              {works.data.map((work, idx) => (
                <tr
                  key={work.id}
                  className={`
                    ${idx % 2 === 0 ? 'bg-white dark:bg-zinc-700' : 'bg-gray-50 dark:bg-zinc-800'}
                    hover:bg-blue-50 dark:hover:bg-zinc-600
                  `}
                >
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-left">{work.id}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-left">{work.team_id}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-left">{work.title}</td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-center">
                    {work.proposal_path && (
                      <a href={work.proposal_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">下載</a>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-center">
                    {work.poster_path && (
                      <a href={work.poster_path} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">下載</a>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-center">
                    {work.code_link && (
                      <a href={work.code_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">連結</a>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-600 text-center">{work.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
