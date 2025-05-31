export default function Header({ auth }) {
    return (
        <header className="bg-indigo-700 text-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                    高雄大學創新創意競賽系統
                </h1>

                <nav className="space-x-4">
                    {auth?.user ? (
                        <a
                            href="/dashboard"
                            className="transition text-white hover:text-yellow-300"
                        >
                            進入後台
                        </a>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="transition text-white hover:text-yellow-400"
                            >
                                登入
                            </a>
                            <a
                                href="/register"
                                className="transition text-white hover:text-yellow-400"
                            >
                                註冊
                            </a>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
