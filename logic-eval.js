/* ============================================================
adjustment-lab｜TWL Roster 2025｜統合傾向分析ロジック v5-Part1
フィジカル構造思考モデル（Input / Control / Output）
============================================================ */

function band(v, low, high) {
  if (isNaN(v)) return "未入力";
  if (v < low) return "低め";
  if (v > high) return "高め";
  return "適正域";
}

function getPhysicalTrends({ s10, cmj, rsi, agility }) {
  const t = [];

  // --- Input（感覚・反応構造） ---
  if (!isNaN(rsi)) {
    if (rsi >= 2.8)
      t.push("[Input] 反応入力が速く、無意識レベルで動きを切り替えられるタイプ。環境変化への適応力が高い。");
    else if (rsi <= 2.0)
      t.push("[Input] 反応速度よりも準備で精度を出すタイプ。環境変化よりも自分のリズムを重視する。");
  }

  // --- Control（運動制御構造） ---
  if (!isNaN(agility)) {
    if (agility <= 4.20)
      t.push("[Control] 姿勢制御に優れ、体の向きを変える動作が滑らか。胸郭と骨盤の分離が自然に起こりやすい。");
    else if (agility > 4.40)
      t.push("[Control] 体幹の操作が重く、方向転換に遅れが出やすい。上半身主導になりやすい傾向。");
  }

  // --- Output（出力構造） ---
  if (!isNaN(cmj) && !isNaN(s10)) {
    if (cmj >= 65 && s10 <= 1.45)
      t.push("[Output] 瞬時に出力を引き出すタイプ。地面反力を効率的に使い、短時間で高出力を発揮できる。");
    else if (cmj < 55 && s10 > 1.60)
      t.push("[Output] 出力の波が小さく、エネルギーを溜めて使う動作が苦手。中間ポジションを意識した練習が有効。");
  }

  // --- Synthesis（統合示唆） ---
  if (rsi >= 2.8 && agility <= 4.2)
    t.push("[統合] 反応・制御・出力の循環が滑らか。動作の流れを壊さず再現できる構造。");
  else if (cmj >= 70 && agility > 4.4)
    t.push("[統合] 出力偏重型。力は強いが情報処理が追いつかないことがある。呼吸と動作の同期が鍵。");

  if (t.length === 0) t.push("データ不足により傾向を特定できません。");
  return t;
}/* ============================================================
adjustment-lab｜TWL Roster 2025｜統合傾向分析ロジック v5-Part2
打撃構造思考モデル（Input / Control / Output）
============================================================ */

function getHittingTrends({ swingSpeed, attackAngle, swingTime, exitVeloB, estDistance, launchAngleB }) {
  const t = [];

  // --- Input（感覚・反応構造） ---
  if (!isNaN(attackAngle) && !isNaN(launchAngleB)) {
    if (attackAngle < 8 && launchAngleB < 10)
      t.push("[Input] 下半身リード型。ボールの見極めや反応は鋭いが、角度調整が追いつかないことがある。");
    else if (attackAngle > 20 && launchAngleB > 25)
      t.push("[Input] 上体主導で反応。出力意識が先行し、タイミングが遅れやすい。");
    else
      t.push("[Input] 反応と動作が同期。投球の変化にもスムーズに対応できる。");
  }

  // --- Control（運動制御構造） ---
  if (!isNaN(swingSpeed) && !isNaN(swingTime)) {
    if (swingSpeed >= 130 && swingTime <= 0.14)
      t.push("[Control] 力の伝達が速く、体幹の回転軸が安定。回旋の始動点と腕の流れが一致している。");
    else if (swingSpeed < 115 && swingTime >= 0.18)
      t.push("[Control] スイング全体を“ため”で作るタイプ。タイミング型で、体幹の切り替えが遅れやすい。");
  }

  // --- Output（出力構造） ---
  if (!isNaN(exitVeloB) && !isNaN(estDistance)) {
    if (exitVeloB >= 155 && estDistance >= 110)
      t.push("[Output] 体幹からバットへの出力伝達が効率的。押し込みではなく、通過で打球を飛ばすタイプ。");
    else if (exitVeloB < 140)
      t.push("[Output] 出力が途切れがち。スイングの軌道が上体で作られている可能性あり。");
  }

  // --- Synthesis（統合示唆） ---
  if (swingSpeed >= 125 && attackAngle >= 10 && attackAngle <= 20)
    t.push("[統合] 軸で回る打者。体の中で反応と出力が連鎖しており、安定したスイング軌道を再現できる。");
  else if (swingSpeed > 130 && launchAngleB > 25)
    t.push("[統合] パワーは高いが、リリース直前の制御が粗くなりやすい。反応の整理が鍵。");

  if (t.length === 0) t.push("打撃系データが不足しています。");
  return t;
}/* ============================================================
adjustment-lab｜TWL Roster 2025｜統合傾向分析ロジック v5-Part3
投球構造思考モデル（Input / Control / Output）
============================================================ */

function getPitchingTrends({ velo, spinRate, vertBreak, horizBreak, releaseAngle }) {
  const t = [];

  // --- Input（感覚・反応構造） ---
  if (!isNaN(releaseAngle)) {
    if (releaseAngle > 12)
      t.push("[Input] 上方向への意識が強く、リリースを前で取るタイプ。リズム変化には慎重。");
    else if (releaseAngle < 5)
      t.push("[Input] 体回転と連動して投げるタイプ。リリースのズレが制球に直結しやすい。");
  }

  // --- Control（運動制御構造） ---
  if (!isNaN(vertBreak) && !isNaN(horizBreak)) {
    if (vertBreak > 55 && horizBreak < 10)
      t.push("[Control] 縦変化主導。体幹と腕のラインが直結し、胸の開きが早くなりやすい。");
    else if (horizBreak > 30)
      t.push("[Control] 横変化主導。腕の出し方に特徴があり、肩甲帯の動きが支配的。");
  }

  // --- Output（出力構造） ---
  if (!isNaN(velo) && !isNaN(spinRate)) {
    if (velo >= 145 && spinRate >= 2400)
      t.push("[Output] 出力と回転の整合性が高い。力ではなく連動で浮き上がる球を生むタイプ。");
    else if (velo >= 145 && spinRate <= 1800)
      t.push("[Output] 押し込み主導。地面反力は強いが、回転方向の制御が追いつかない。");
    else if (velo <= 135 && spinRate >= 2500)
      t.push("[Output] 軽い出力で高い回転を作る抜け型。テンポで球質を変えられるタイプ。");
  }

  // --- Synthesis（統合示唆） ---
  if (velo >= 145 && spinRate >= 2400 && releaseAngle >= 10)
    t.push("[統合] 立体的な出力構造。下半身から指先までの力の線が通り、投げるではなく流す投球。");
  else if (velo >= 140 && spinRate < 1800)
    t.push("[統合] 押し込み型の出力構造。強さはあるが分離が弱い。胸郭操作の再教育で安定。");

  if (t.length === 0) t.push("投球系データが不足しています。");
  return t;
}

/* === メリット・デメリット抽出 === */
function summarizeAdvantages(trends) {
  const positives = [];
  const negatives = [];

  trends.forEach(t => {
    if (t.includes("優れる") || t.includes("効率") || t.includes("滑らか") || t.includes("再現") || t.includes("整合"))
      positives.push(t);
    if (t.includes("遅い") || t.includes("課題") || t.includes("粗く") || t.includes("不安定") || t.includes("弱い"))
      negatives.push(t);
  });

  return {
    positives: positives.length ? positives : ["強みはまだ明確でない。動作の整理で特性が現れる可能性あり。"],
    negatives: negatives.length ? negatives : ["現時点では顕著な弱点なし。再現性の維持を優先。"]
  };
}
