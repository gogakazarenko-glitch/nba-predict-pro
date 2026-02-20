import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Твой ключ напрямую в коде
  const API_KEY = 'c65287f6-dd68-475d-8c6b-d0cbdcc25166';
  
  try {
    // Получаем матчи на сегодня (20 февраля 2026)
    // Мы используем фильтр по дате, чтобы видеть актуальные игры
    const response = await fetch('https://api.balldontlie.io/v1/games?dates[]=2026-02-20', {
      headers: { 
        'Authorization': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Возвращаем данные на фронтенд
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Ошибка при получении данных NBA из API' });
  }
}
