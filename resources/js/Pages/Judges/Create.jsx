import React, { useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import SidePanel from "@/Components/SidePanel";

const SCORE_FIELDS = ['score1', 'score2', 'score3', 'score4'];

export default function JudgeForm({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    team_name: '',
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
          <div>
            <label className="block mb-1 font-medium">標題 <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 dark:text-black"
              required
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
          </div>
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
          <div>
            <label className="block mb-1 font-medium">隊伍名稱 <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="team_name"
              value={data.team_name}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 dark:text-black"
              required
            />
            {errors.team_name && <div className="text-red-500 text-sm">{errors.team_name}</div>}
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
