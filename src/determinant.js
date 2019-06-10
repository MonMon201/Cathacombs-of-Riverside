'use strict';
// Determinant
// Modules
const join = require('path').join;
const functions = require(join(__dirname, 'functions.js'));

// Moving hero through the cathacombs
const go = (argument, creatureName, ctx, world) => {
  // We are recieving the number of the room in string type,
  // but we need an index of the room in integer type.
  argument = functions.miracleNumbers(argument) - 1;

  // Also, we need to understand, that the argument
  // is correct and we can send it to worlds method.
  // Firstly we use CFiW to figure out, in which Room is our Creature.
  // And then we use WF to figure out, what Rooms can we visit.

  const exits = functions
    .wayFinder(world.rooms[functions
      .creatureFindingInWorld(world.rooms, creatureName)], world.Matrix);
  // Using array with exits, we are checking if
  // there any matches with an argument, also count failed comparisons.
  let counter = 0;
  for (let i = 0; i < exits.length; i++) {
    if (exits[i] === argument) {
      world
        .moveCreature(world.rooms[functions
          .creatureFindingInWorld(world.rooms, creatureName)],
        world.rooms[argument], creatureName);
    } else {
      counter++;
      if (counter === exits.length) {
        ctx.reply('Incorrect number!');
      }
    }
  }
};

const where = (creatureName, ctx, world) => {
  // Let's find you!
  ctx
    .reply(creatureName + ' is in a room #' + (functions
      .creatureFindingInWorld(world.rooms, creatureName) + 1));
};

const ways = (creatureName, ctx, world) => {
  // If you are looking for some ways to go.
  functions
    .lookAround(world.rooms[functions
      .creatureFindingInWorld(world.rooms, creatureName)], world.Matrix, ctx);
};

// This function determinates where should commands
// and arguments go, also it manages additional data.
const determinant = (command, argument, creatureName, ctx, world, bot) => {
  if (command === 'go') {
    bot.command(command, go(argument, creatureName, ctx, world));
  }
  if (command === 'where') {
    bot.command(command, where(creatureName, ctx, world));
  }
  if (command === 'ways') {
    bot.command(command, ways(creatureName, ctx, world));
  }
};

// This function parses user's messages on commands and arguments.
const ear = (ctx, creatureName, world, bot) => {
  let text = ctx.message.text;
  text = text.split(' ');
  const command = text[0].replace('/', '');
  const argument = text[1];
  determinant(command, argument, creatureName, ctx, world, bot);
};

// Exportation

module.exports = {
  ear,
  determinant,
};
