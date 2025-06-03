import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function WorksIndex({ works, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('works.index'), { search });
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="搜尋標題"
                />
                <button type="submit">搜尋</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>隊伍ID</th>
                        <th>標題</th>
                        <th>企劃書</th>
                        <th>海報</th>
                        <th>程式碼連結</th>
                        <th>建立時間</th>
                    </tr>
                </thead>
                <tbody>
                    {works.data.length === 0 && (
                        <tr>
                            <td colSpan="7">查無資料</td>
                        </tr>
                    )}
                    {works.data.map(work => (
                        <tr key={work.id}>
                            <td>{work.id}</td>
                            <td>{work.team_id}</td>
                            <td>{work.title}</td>
                            <td>
                                {work.proposal_path && (
                                    <a href={work.proposal_path} target="_blank" rel="noopener noreferrer">下載</a>
                                )}
                            </td>
                            <td>
                                {work.poster_path && (
                                    <a href={work.poster_path} target="_blank" rel="noopener noreferrer">下載</a>
                                )}
                            </td>
                            <td>
                                {work.code_link && (
                                    <a href={work.code_link} target="_blank" rel="noopener noreferrer">連結</a>
                                )}
                            </td>
                            <td>{work.created_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
