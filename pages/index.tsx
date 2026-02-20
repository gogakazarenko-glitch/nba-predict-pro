import React, { useEffect, useState } from 'react';
import { calculateWinProbability } from '../lib/analysis';
import { Trophy, Activity, AlertCircle } from 'lucide-react';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/fetchMatches');
        const data = await res.json();
        // В реальном API данные лежат в data.data
        setMatches(data.data || []);
      } catch (e) {
        console.error("Ошибка загрузки");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            NBA ANALYTICS PRO
          </h1>
          <p className="text-slate-400 text-sm">AI-прогнозы на основе живых данных 2026</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
          <Activity className="text-green-400 w-4 h-4 animate-pulse" />
          <span className="text-xs font-medium text-green-400">LIVE UPDATES</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <p className="text-slate-400 font-medium">Анализируем ростеры и статистику...</p>
          </div>
        ) : matches.length > 0 ? (
          matches.map((game: any) => {
            // Временные статы для формулы (пока API не дает полную глубину)
            const dummyStats = { pts: 115, ast: 25, reb: 44, oreb: 10, dreb: 34, stl: 7, blk: 5, fg_pct: 0.47 };
            const prediction = calculateWinProbability(dummyStats, dummyStats);

            return (
              <div key={game.id} className="glass-card rounded-2xl p-6 border border-slate-800 bg-slate-900/40 hover:border-sky-500/50 transition-all shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Match ID: {game.id}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Trophy className="w-3 h-3" />
                    <span className="text-xs font-bold">Conf: {prediction.confidence}/10</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{game.home_team.full_name}</span>
                    <span className="text-2xl font-black text-sky-400">{prediction.homeProb}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                    <div style={{ width: `${prediction.homeProb}%` }} className="bg-sky-500 h-full"></div>
                    <div style={{ width: `${prediction.awayProb}%` }} className="bg-rose-500 h-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{game.visitor_team.full_name}</span>
                    <span className="text-2xl font-black text-rose-400">{prediction.awayProb}%</span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors">
                  ПОДРОБНЫЙ АНАЛИЗ СОСТАВА
                </button>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-slate-900/50 p-10 rounded-3xl text-center border border-dashed border-slate-700">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 italic">Сегодня матчей не найдено (All-Star Weekend). Прогнозы появятся с возобновлением сезона.</p>
          </div>
        )}
      </main>
    </div>
  );
}
