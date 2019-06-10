'use strict';

// CFiL: CreatureFindingInList. This function
// finds index of a Creature in the CreatureList
const creatureFindingInList = (creatureList, creatureName) => {
  for (let i = 0; i < creatureList.length; i++) {
    if (creatureList[i].creatureName === creatureName) return i;
  }
  return 0;
};
// CFiW: CreatureFindingInWorld. This function finds
// index of a creature in the World.
// First 'for' initialises search through Rooms,
// and the second one initialises search through CreatureLists.
const creatureFindingInWorld = (rooms, creatureName) => {
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].creatureList.length; j++) {
      if (rooms[i].creatureList[j].creatureName === creatureName) return i;
    }
  }
};

// MN: MiracleNumbers. This function gets argument from the User,
// and then translate it from string to integer
const miracleNumbers = argument => {
  if (isNaN(argument) !== true && argument !== undefined && argument !== null) {
    return parseInt(argument);
  }
};

// WF: WayFinder. This function finds Rooms,
// which are connected to our location and write down their indexes.
// There always at least one.
// It checks the row of the Room, which are we going to leave
// Exits - array of exits from the Room,
// and k is counter of index for the array.
const wayFinder = (exitRoom, Matrix) => {
  const exits = [];
  let k = 0;
  for (let i = 0; i < Matrix[exitRoom.index].length; i++) {
    if (Matrix[exitRoom.index][i] === 1) {
      exits[k] = i;
      k++;
    }
  }
  return exits;
};

// LA: lookAround. This function allows
// us to understand where we can go from our place.
const lookAround = (exitRoom, Matrix, ctx) => {
  // Searching for exits from the Room with WF.
  const exits = wayFinder(exitRoom, Matrix);
  // If there is only one way - we are using 'is'
  if (exits.length === 1) {
    ctx.reply('There is only one way - to room number ' + (exits[0] + 1) + '.');
  }
  // If there are many ways - we are
  // using 'are' and combaining those ways in one line.
  if (exits.length > 1) {
    // Combining line
    let line = '';
    // Combiner
    for (let i = 0; i < exits.length; i++) {
      line += (' ' + (exits[i] + 1) + ',');
    }
    // Corretion
    line = line.substring(0, (line.length) - 1);
    // Output
    ctx.reply('There are rooms number' + line);
  }
};

// Function exportation

module.exports = {
  lookAround,
  wayFinder,
  creatureFindingInList,
  miracleNumbers,
  creatureFindingInWorld
};
