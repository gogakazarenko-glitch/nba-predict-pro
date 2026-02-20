export interface TeamStats {
  pts: number;
  ast: number;
  reb: number;
  oreb: number;
  dreb: number;
  stl: number;
  blk: number;
  fg_pct: number;
}

export function calculateWinProbability(home: TeamStats, away: TeamStats) {
  // Индекс атаки
  const homeAttack = (home.pts * 0.4) + (home.ast * 0.6) + (home.fg_pct * 100);
  const awayAttack = (away.pts * 0.4) + (away.ast * 0.6) + (away.fg_pct * 100);

  // Индекс защиты
  const homeDefense = (home.blk * 2.0) + (home.stl * 1.5) + (home.dreb * 0.5);
  const awayDefense = (away.blk * 2.0) + (away.stl * 1.5) + (away.dreb * 0.5);

  let homeTotal = homeAttack + homeDefense;
  let awayTotal = awayAttack + awayDefense;

  // Домашнее преимущество
  homeTotal *= 1.05;

  const totalPower = homeTotal + awayTotal;
  const homeProb = Math.round((homeTotal / totalPower) * 100);
  const awayProb = 100 - homeProb;

  // Уровень уверенности
  const diff = Math.abs(homeProb - awayProb);
  let confidence = 5;
  if (diff > 15) confidence = 8;
  if (diff > 25) confidence = 9;

  return {
    homeProb,
    awayProb,
    confidence
  };
}
