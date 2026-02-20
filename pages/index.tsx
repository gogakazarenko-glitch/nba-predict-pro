import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-sky-400 mb-4">NBA Analytics Pro</h1>
      <p className="text-lg text-slate-400">Система загружается... Сегодня Матч Звезд 2026!</p>
      <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl">
        <p>Скоро здесь появятся живые прогнозы с учетом травм.</p>
      </div>
    </div>
  );
}
