/* ============================================================
adjustment-lab｜preparation-twl-jaba2025｜統合評価ロジック v2025.11
============================================================ */

function cooperToVO2max(dist){ return (dist - 504.9) / 44.73; }
function yoyoToVO2max(dist){ return dist * 0.0084 + 36.4; }

function calcSprintScore(s10, s30, s60) {
  let score = 0;
  if (!isNaN(s10)) {
    if (s10 <= 1.45) score += 3;
    else if (s10 <= 1.50) score += 2;
    else if (s10 <= 1.60) score += 1;
  }
  if (!isNaN(s30)) {
    if (s30 <= 3.75) score += 3;
    else if (s30 <= 3.85) score += 2;
    else if (s30 <= 3.95) score += 1;
  }
  if (!isNaN(s60)) {
    if (s60 <= 6.90) score += 3;
    else if (s60 <= 7.10) score += 2;
    else if (s60 <= 7.30) score += 1;
  }
  return Math.min(3, Math.round(score / 3)); // 合計平均化で3点上限
}

function calcCMJScore(cmj) {
  if (isNaN(cmj)) return 0;
  if (cmj >= 70) return 3;
  if (cmj >= 60) return 2;
  if (cmj >= 50) return 1;
  return 0;
}

function calcRSIScore(rsi) {
  if (isNaN(rsi)) return 0;
  if (rsi >= 3.0) return 3;
  if (rsi >= 2.5) return 2;
  if (rsi >= 2.0) return 1;
  return 0;
}

function calcAgilityScore(agility) {
  if (isNaN(agility)) return 0;
  if (agility <= 4.20) return 3;
  if (agility <= 4.35) return 2;
  if (agility <= 4.50) return 1;
  return 0;
}

function calcBlastScore(batSpeed, attackAngle, timeToContact) {
  if (isNaN(batSpeed) && isNaN(attackAngle) && isNaN(timeToContact)) return 0;
  let score = 0;
  if (!isNaN(batSpeed)) {
    if (batSpeed >= 75) score += 3;
    else if (batSpeed >= 70) score += 2;
    else if (batSpeed >= 65) score += 1;
  }
  if (!isNaN(attackAngle)) {
    if (attackAngle >= 12 && attackAngle <= 18) score += 3;
    else if (attackAngle >= 10 && attackAngle <= 20) score += 2;
    else if (attackAngle >= 8 && attackAngle <= 22) score += 1;
  }
  if (!isNaN(timeToContact)) {
    if (timeToContact >= 0.14 && timeToContact <= 0.16) score += 3;
    else if (timeToContact >= 0.13 && timeToContact <= 0.17) score += 2;
    else if (timeToContact >= 0.12 && timeToContact <= 0.18) score += 1;
  }
  return Math.min(3, Math.round(score / 3)); // 平均で3点満点に正規化
}

function calcRapsodoBatterScore(exitVelo, launchAngle, consistency) {
  if (isNaN(exitVelo) && isNaN(launchAngle) && isNaN(consistency)) return 0;
  let score = 0;
  if (!isNaN(exitVelo)) {
    if (exitVelo >= 160) score += 3;
    else if (exitVelo >= 150) score += 2;
    else if (exitVelo >= 140) score += 1;
  }
  if (!isNaN(launchAngle)) {
    if (launchAngle >= 12 && launchAngle <= 18) score += 3;
    else if (launchAngle >= 10 && launchAngle <= 20) score += 2;
    else if (launchAngle >= 8 && launchAngle <= 22) score += 1;
  }
  if (!isNaN(consistency)) {
    if (consistency <= 3) score += 3;
    else if (consistency <= 5) score += 2;
    else if (consistency <= 7) score += 1;
  }
  return Math.min(3, Math.round(score / 3));
}

function calcRapsodoPitcherScore(velo, spinEff, extension, consistency) {
  if (isNaN(velo) && isNaN(spinEff) && isNaN(extension) && isNaN(consistency)) return 0;
  let score = 0;
  if (!isNaN(velo)) {
    if (velo >= 145) score += 3;
    else if (velo >= 140) score += 2;
    else if (velo >= 135) score += 1;
  }
  if (!isNaN(spinEff)) {
    if (spinEff >= 85 && spinEff <= 95) score += 3;
    else if (spinEff >= 80 && spinEff <= 98) score += 2;
    else if (spinEff >= 75 && spinEff <= 99) score += 1;
  }
  if (!isNaN(extension)) {
    if (extension >= 180) score += 3;
    else if (extension >= 170) score += 2;
    else if (extension >= 160) score += 1;
  }
  if (!isNaN(consistency)) {
    if (consistency <= 3) score += 3;
    else if (consistency <= 5) score += 2;
    else if (consistency <= 7) score += 1;
  }
  return Math.min(3, Math.round(score / 3));
}
function calcTotalScore({ s10, s30, s60, cmj, rsi, agility, batSpeed, attackAngle, timeToContact, exitVelo, launchAngle, batterConsistency, velo, spinEff, extension, pitcherConsistency }){
  const sprintScore = calcSprintScore(s10, s30, s60);
  const cmjScore = calcCMJScore(cmj);
  const rsiScore = calcRSIScore(rsi);
  const agilityScore = calcAgilityScore(agility);
  const blastScore = calcBlastScore(batSpeed, attackAngle, timeToContact);
  const rapsodoBatterScore = calcRapsodoBatterScore(exitVelo, launchAngle, batterConsistency);
  const rapsodoPitcherScore = calcRapsodoPitcherScore(velo, spinEff, extension, pitcherConsistency);
  return {
    sprintScore,
    cmjScore,
    rsiScore,
    agilityScore,
    blastScore,
    rapsodoBatterScore,
    rapsodoPitcherScore,
    totalBatter: sprintScore + cmjScore + rsiScore + agilityScore + blastScore + rapsodoBatterScore,
    totalPitcher: sprintScore + cmjScore + rsiScore + agilityScore + rapsodoPitcherScore
  };
}

function getProfileType(vo2, totalScore) {
  if (vo2 >= 49 && totalScore >= 18)
    return {type:"完全統合型（Total Performer）", color:"gold", desc:"出力・反応・再現性すべてが高水準。全国上位〜プロ水準。"};
  if (vo2 < 49 && totalScore >= 18)
    return {type:"出力優位型（Explosive Specialist）", color:"green", desc:"出力と反応は抜群だが再現性に課題。短期決戦型。"};
  if (vo2 >= 49 && totalScore >= 12)
    return {type:"安定発揮型（Enduring Competitor）", color:"blue", desc:"再現性に優れ、安定したパフォーマンスを維持できるタイプ。"};
  if (vo2 < 49 && totalScore >= 12)
    return {type:"瞬発主導型（Power-Dominant）", color:"orange", desc:"爆発的出力は高いが安定性に波がある。"};
  return {type:"基盤形成期（Foundation Stage）", color:"gray", desc:"出力・再現力とも発展段階。呼吸・基礎持久の育成を優先。"};
}
