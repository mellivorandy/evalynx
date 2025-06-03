import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";

const SCORE_FIELDS = ['score1', 'score2', 'score3', 'score4'];

export default function JudgeForm({ auth, projects = [], teams = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    id: '',        // 作品id，作為judge主鍵
    team_id: '',   // 作品team_id
    title: '',     // 作品title
    description: '',
    team_name: '', // 隊伍名稱
    completed: false,
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
  });

  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    setTotal(
      SCORE_FIELDS.reduce((sum, key) => sum + Number(data[key] || 0), 0)
    );
  }, [data]);

  // 當選擇作品時，同時設定 id、team_id、title、team_name
  const handleProjectChange = (e) => {
    const selectedId = e.target.value;
    setData('id', selectedId);
    const project = projects.find(p => String(p.id) === String(selectedId));
    setData('team_id', project ? project.team_id : '');
    setData('title', project ? project.title : '');
    // 自動帶出隊伍名稱
    const team = teams.find(t => String(t.id) === String(project ? project.team_id : ''));
    setData('team_name', team ? team.name : '');
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('judges.store'), {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-white min-h-screen relative">
      <Header auth={auth} />
      <SidePanel auth={auth} />
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white dark:bg-zinc-700 rounded shadow space-y-6">
          <h2 className="text-xl font-bold mb-4">評審成績填寫</h2>
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
          {/* 顯示已選作品的 team_id */}
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
          {/* 顯示已選作品的 title (用作品 *) */}
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
          {/* 自動帶出隊伍名稱 */}
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
          <div>
            <label className="block mb-1 font-medium">描述</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 dark:text-black"
              rows={2}
            />
          </div>
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
            {SCORE_FIELDS.map((key, idx) => (
              <div key={key}>
                <label className="block mb-1 font-medium">評分 {idx + 1} <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name={key}
                  value={data[key]}
                  onChange={handleChange}
                  min={0}
                  max={25}
                  className="w-full border rounded px-2 py-1 dark:text-black"
                  required
                />
                {errors[key] && <div className="text-red-500 text-sm">{errors[key]}</div>}
              </div>
            ))}
          </div>
          <div className="text-right font-bold text-lg">
            總分：{total} / 100
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={processing}>
            送出評分
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
