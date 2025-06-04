import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '../../Components/Modal.jsx';

const SCORE_FIELDS = ['score1', 'score2', 'score3', 'score4'];
const SCORE_LABELS = {
  score1: '創意與構想',
  score2: '技術實作與程式碼品質',
  score3: '美術設計與使用體驗',
  score4: '完整度與展示效果',
};

export default function Edit({ show, onClose, judge, projects = [], teams = [] }) {
  // hooks 必須在最上方
  const { data, setData, put, processing, errors, reset } = useForm({
    id: judge?.id ?? '',
    team_id: judge?.team_id ?? '',
    title: judge?.title ?? '',
    description: judge?.description ?? '',
    team_name: judge?.team_name ?? '',
    completed: judge?.completed ?? false,
    score1: judge?.score1 ?? 0,
    score2: judge?.score2 ?? 0,
    score3: judge?.score3 ?? 0,
    score4: judge?.score4 ?? 0,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      SCORE_FIELDS.reduce((sum, key) => sum + Number(data[key] || 0), 0)
    );
  }, [data]);

  // judge 為 null 時不渲染
  if (!judge) return null;

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
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-8 bg-zinc-900 text-white rounded-xl space-y-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          編輯評審成績
        </h2>

        <div className="space-y-4">
          {/* 作品選擇 */}
          <div>
            <label className="block mb-1 font-semibold">
              作品ID <span className="text-red-500">*</span>
            </label>
            <select
              name="id"
              value={data.id}
              onChange={handleProjectChange}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            >
              <option value="">請選擇作品</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {`ID:${p.id}`}
                </option>
              ))}
            </select>
            {errors.id && (
              <div className="text-red-500 text-xs mt-1">{errors.id}</div>
            )}
          </div>

          {data.team_id && (
            <div>
              <label className="block mb-1 font-semibold">team_ID</label>
              <input
                type="text"
                name="team_id"
                value={data.team_id}
                readOnly
                className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white"
              />
            </div>
          )}

          {data.title && (
            <div>
              <label className="block mb-1 font-semibold">作品 *</label>
              <input
                type="text"
                name="title"
                value={data.title}
                readOnly
                className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white"
              />
            </div>
          )}

          {data.team_name && (
            <div>
              <label className="block mb-1 font-semibold">隊伍名稱</label>
              <input
                type="text"
                name="team_name"
                value={data.team_name}
                readOnly
                className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white"
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
              className="rounded border-gray-400 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="completed" className="font-medium">已完成評審</label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-2">
          {SCORE_FIELDS.map((key) => (
            <div key={key}>
              <label className="block mb-1 font-semibold">
                {SCORE_LABELS[key]} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name={key}
                value={data[key]}
                onChange={handleChange}
                min={0}
                max={25}
                className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                required
              />
              {errors[key] && (
                <div className="text-red-500 text-xs mt-1">{errors[key]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-right font-bold text-lg mt-2 text-blue-300">
          總分：{total} / 100
        </div>

        <div>
          <label className="block mb-1 font-semibold">評論</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-zinc-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-zinc-700 text-gray-200 hover:bg-zinc-600 transition font-semibold"
            onClick={onClose}
          >
            取消
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow"
            disabled={processing}
          >
            儲存
          </button>
        </div>
      </form>
    </Modal>
  );
}
