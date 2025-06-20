// components/CountdownTimer.tsx
'use client';
import { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTime = () => {
        const distance = +new Date(targetDate) - +new Date();
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / 1000 / 60) % 60),
            seconds: Math.floor((distance / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTime());

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="flex gap-6 text-white text-2xl font-mono">
            {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="text-center">
                    <div className="text-4xl">{value}</div>
                    <div className="uppercase text-sm">{label}</div>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;