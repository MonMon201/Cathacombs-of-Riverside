'use strict';
// Modules
const join = require('path').join;
const functions = require(join(__dirname, 'functions.js'));
const uuidV1 = require('uuid/v1');

// All classes in the world.

// One of lowest structures, they are stored in Rooms.
// Names of Creatures are not uniq, but we've got IDs now - so
// it's not a problem to track down one, wherever it is...
// to add Creatures name to the pool, use MAP (read about it on docs)

class Creature {
  constructor(creatureName, hp, damage) {
    this.creatureName = creatureName;
    this.hp = hp;
    this.damage = damage;
    this.id = uuidV1();
  }
  
  getName(){
    return this.creatureName;
  }
  
  setDamage(damage){
    this.damage = damage;
  }

  getDamage(){
    return this.damage;
  }

  setHP(hp){
    this.hp = hp;
  }

  getHP(){
    return this.hp;
  }

  getID(){
    return this.id;
  }

}

// Middle structures, they are stored in Worlds.
// Indexes are needed to know, which index
// do they have in the Matrix of their world.

class Room {
  constructor(index, creatureList) {
    this.index = index;
    this.creatureList = creatureList;
  }

  // Method for adding Creatures to Rooms

  addCreature(creature) {
    this.creatureList[this.creatureList.length] = creature;
  }

  //Method for removing Creatures from Rooms, it's made here, 
  //it's better here because we can remove creatures after fight

  removeCreature(creature){
    this.creatureList
        .splice(functions
          .creatureFindingInRoom(this.creatureList, creature), 1);
  };

  //pretty obviously - fight between creatures.
  fight(reciever, sender){
    
    let recieverIndex = functions.creatureFindingByID(this.creatureList, reciever.getID());
    let senderIndex = functions.creatureFindingByID(this.creatureList, sender.getID());

    let hpLeft = this.creatureList[recieverIndex].getHP() - this.creatureList[senderIndex].getDamage();
    (hpLeft <= 0) ? this.removeCreature(this.creatureList[recieverIndex]) : this.creatureList[recieverIndex].setHP(hpLeft);
  }

}

// Highest structures, they are containing everything in this world.
class World {
  constructor(rooms) {
    this.rooms = rooms;
    this.Matrix = [[]];
  }

  // Method for adding new Rooms.
  addRoom(room) {
    this.rooms[this.rooms.length] = room;
  }

  // Method for moving Creatures in Rooms, if those rooms are connected.
  // This method is pushing a copy of a Creature from the other Room.
  // To find the Creature in the other Room we use CFil
  // Then, we remove the Creature from the first Room with splice method.
  moveCreature(exitRoom, enterRoom, creature) {
    if (this.Matrix[exitRoom.index][enterRoom.index] === 1) {
      enterRoom.creatureList
        .push(exitRoom.creatureList[functions
          .creatureFindingInWorld(this.rooms, creature, 'list')]);
      exitRoom.creatureList
        .splice(functions
          .creatureFindingInWorld(this.rooms, creature, 'list'));
    }
  }

  // Method for connecting Rooms together.
  // I am using an adjacency matrix for understanding that rooms are conected.
  // There I check, if we have such columns and rows in this.Matrix.
  // If no - I create them, and connect then.
  addConnector(room1, room2) {
    let value;
    room1.index > room2.index ? value = room1.index : value = room2.index;
    for (let i = 0; i <= value; i++) {
      if (this.Matrix[i] === undefined) {
        this.Matrix[i] = [];
      }
      for (let j = 0; j <= value; j++) {
        if (this.Matrix[i][j] === undefined)
          this.Matrix[i][j] = 0;
      }
    }
    this.Matrix[room1.index][room2.index] = 1;
    this.Matrix[room2.index][room1.index] = 1;
  }

}


// classes for worker-class

module.exports = {
  Creature,
  Room,
  World,
};

