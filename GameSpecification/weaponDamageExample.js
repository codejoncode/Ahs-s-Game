function getDamage(stats) {
  let strengthBonus = 1;
  for (i = 1; i < stats.strength; i++)
    strengthBonus += 1 / (i + 1);
  strengthBonus *= scaling.strength
  let dexBonus = 1;
  for (i = 1; i < stats.dex; i++)
    dexBonus += 1 / (i + 1);
  dexBonus *= scaling.dex
  let totalDamage = Math.floor(baseDamage * (1 + strengthBonus + dexBonus));
  return totalDamage;
}

let baseDamage = 50;

let scaling = {
  strength: 0.45,
  dex: 0.15
}
console.log(getDamage({
  strength: 99,
  dex: 99
}));