import { React, useState } from "react";
import { useForm, Head } from "@inertiajs/react";

export default function RegisterTeam() {
    const { data, setData, post, processing, errors } = useForm({
        team_name: "",
        advisor_email: "",
        title: "",
        proposal_path: null,
        poster_path: null,
        code_link: "",
        teammates: [""],
    });

    const [localErrors, setLocalErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const errs = {};

        if (data.code_link.trim() !== "") {
            try {
                new URL(data.code_link);
            } catch {
                errs.code_link = "請輸入合法的網址";
            }
        }

        if (Object.keys(errs).length > 0) {
            setLocalErrors(errs);
            return;
        }

        setLocalErrors({});
        post("/register-team", {
            forceFormData: true,
            onSuccess: () => {
                console.log("報名成功！");
            },
            onError: (err) => {
                console.error("送出失敗", err);
            },
        });
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <Head title="隊伍報名" />
            <h1 className="text-2xl font-bold mb-6">學生隊伍報名</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold">隊伍名稱</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.team_name}
                        onChange={(e) => setData("team_name", e.target.value)}
                    />
                    {errors.team_name && (
                        <p className="text-red-500 text-sm">
                            {errors.team_name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">
                        指導老師 Email
                    </label>
                    <input
                        type="email"
                        className="w-full border p-2 rounded"
                        value={data.advisor_email}
                        onChange={(e) =>
                            setData("advisor_email", e.target.value)
                        }
                    />
                    {errors.advisor_email && (
                        <p className="text-red-500 text-sm">
                            {errors.advisor_email}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">作品標題</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">企劃書（PDF）</label>
                    <input
                        type="file"
                        name="proposal_path"
                        onChange={handleFileChange}
                    />
                    {errors.proposal_path && (
                        <p className="text-red-500 text-sm">
                            {errors.proposal_path}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">海報圖檔</label>
                    <input
                        type="file"
                        name="poster_path"
                        onChange={handleFileChange}
                    />
                    {errors.poster_path && (
                        <p className="text-red-500 text-sm">
                            {errors.poster_path}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">
                        Code Repository Link
                    </label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={data.code_link}
                        onChange={(e) => setData("code_link", e.target.value)}
                    />
                    {localErrors.code_link && (
                        <p className="text-red-500 text-sm">
                            {localErrors.code_link}
                        </p>
                    )}
                    {errors.code_link && (
                        <p className="text-red-500 text-sm">
                            {errors.code_link}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold">
                        其他隊員 Email（選填）
                    </label>
                    {data.teammates.map((email, index) => (
                        <input
                            key={index}
                            type="text"
                            className="w-full border p-2 rounded mb-2"
                            value={email}
                            onChange={(e) => {
                                const updated = [...data.teammates];
                                updated[index] = e.target.value;
                                setData("teammates", updated);
                            }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setData("teammates", [...data.teammates, ""])
                        }
                        className="text-blue-600 underline text-sm"
                    >
                        + 新增隊員欄位
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    提交報名
                </button>
            </form>
        </div>
    );
}
