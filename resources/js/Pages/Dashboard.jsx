import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    儀錶板
                </h2>
            }
        >
            <Head title="個人專區" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            登入成功! 
                            <Link
                                href="/judges" 
                                className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                查看隊伍
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
