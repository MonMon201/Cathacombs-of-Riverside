'use strict';
// Modules
const join = require('path').join;
const functions = require(join(__dirname, 'functions.js'));

// All classes in the world.

// Lowest structures, they are stored in Rooms.
// Names of Creatures are uniq - so it's not a problem to track down one, wherever it is...
class Creature {
  constructor(creatureName) {
    this.creatureName = creatureName;

  }
}

// Middle structures, they are stored in Worlds.
// Indexes are needed to know, which index do they have in the Matrix of their world.
class Room {
  constructor(index, creatureList) {
    this.index = index;
    this.creatureList = creatureList;
  }

  // Method for adding Creatures to Rooms
  addCreature(creature) {
    this.creatureList[this.creatureList.length] = creature;
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
  moveCreature(exitRoom, enterRoom, creatureName) {
    if (this.Matrix[exitRoom.index][enterRoom.index] === 1) {
      enterRoom.creatureList
        .push(exitRoom.creatureList[functions
          .creatureFindingInList(exitRoom.creatureList, creatureName)]);
      exitRoom.creatureList
        .splice(functions
          .creatureFindingInList(exitRoom.creatureList, creatureName));
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

