class Player {
    constructor(name, health, strength, attack) {
      this.name = name;
      this.health = health;
      this.strength = strength;
      this.attack = attack;
    }
  
    reduceHealth(damage) {
      this.health = Math.max(0, this.health - damage);
    }
  
    isAlive() {
      return this.health > 0;
    }
  }
  
  module.exports = Player;
  