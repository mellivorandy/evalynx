import { useEffect, useState } from 'react';

export default function Footer() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const date = now.toLocaleDateString('en-US', {
                timeZone: 'Asia/Taipei',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            });

            const time = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Taipei',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });

            setTime(`${date} ${time}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="bg-gray-100 dark:bg-zinc-800 text-center py-4 mt-12 text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} 高雄大學創新創意競賽系統.
            <br/> All rights reserved.
            <div className="mt-1">
                Server time: {time} <sup>UTC+8</sup>
            </div>
        </footer>
    );
}
