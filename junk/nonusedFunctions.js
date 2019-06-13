/*
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
*/
