const Player = require("../models/player");
const Dice = require("../models/dice");

const startBattle = (req, res) => {
  const { playerAData, playerBData } = req.body;
  const playerA = new Player(playerAData.name, playerAData.health, playerAData.strength, playerAData.attack);
  const playerB = new Player(playerBData.name, playerBData.health, playerBData.strength, playerBData.attack);

  const attackingDice = new Dice();
  const defendingDice = new Dice();

  const battleLog = [];
  while (playerA.isAlive() && playerB.isAlive()) {
    const first = playerA.health < playerB.health ? playerA : playerB;
    const second = first === playerA ? playerB : playerA;

    playTurn(first, second, attackingDice, defendingDice, battleLog);
    if (second.isAlive()) {
      playTurn(second, first, attackingDice, defendingDice, battleLog);
    }
  }

  res.json({
    winner: playerA.isAlive() ? playerA.name : playerB.name,
    log: battleLog,
  });
};

const playTurn = (attacker, defender, attackingDice, defendingDice, log) => {
  const attackRoll = attackingDice.roll();
  const defenseRoll = defendingDice.roll();

  const attackDamage = attacker.attack * attackRoll;
  const defenseStrength = defender.strength * defenseRoll;

  const damage = Math.max(0, attackDamage - defenseStrength);
  defender.reduceHealth(damage);

  log.push({
    attacker: attacker.name,
    attackRoll,
    defender: defender.name,
    defenseRoll,
    damage,
    remainingHealth: defender.health,
  });
};

module.exports = { startBattle };
