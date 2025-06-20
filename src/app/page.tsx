'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Countdown Timer Component
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
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
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

// Home Page
export default function Home() {
  const categories = [
    { title: 'Poetry', image: '/poetry.jpeg' },
    { title: 'Music', image: '/music.jpeg' },
    { title: 'Sports', image: '/sports.jpeg' },
    { title: 'Events', image: '/events.jpeg' },
  ];

  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  const isoDate = twoWeeksFromNow.toISOString();

  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-indigo-800 to-purple-700 text-white">
        <main className="row-start-2 flex flex-col items-center gap-12 w-full max-w-screen-xl">

          {/* Hero Section */}
          <section className="text-center space-y-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
              <Image
                  src="/logo.png"
                  alt="Site Logo"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
              />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">Welcome to the Main Event</h1>
            <p className="text-lg text-white/80">
              Whether it’s a concert, a poem reading, or the game of the season—your moment is almost here.
            </p>
            <button className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-full hover:bg-purple-100 transition">
              Learn More
            </button>
          </section>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={isoDate} />

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mt-8">
            {categories.map(({ title, image }) => (
                <motion.div
                    key={title}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="rounded overflow-hidden shadow-lg bg-white/10 backdrop-blur-md p-4 flex flex-col items-center"
                >
                  <Image
                      src={image}
                      alt={title}
                      width={300}
                      height={200}
                      className="rounded object-cover"
                  />
                  <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                </motion.div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm">

        </footer>
      </div>
  );
}
