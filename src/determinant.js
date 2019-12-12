'use strict';
// Determinant
// Modules
const join = require('path').join;
const functions = require(join(__dirname, 'functions.js'));

// Moving hero through the cathacombs
const go = (argument, creature, ctx, world) => {
  // We are recieving the number of the room in string type,
  // but we need an index of the room in integer type.
  argument = functions.miracleNumbers(argument) - 1;

  // Also, we need to understand, that the argument
  // is correct and we can send it to worlds method.
  // Firstly we use CFiW to figure out, in which Room is our Creature.
  // And then we use WF to figure out, what Rooms can we visit.
  
  const exits = functions
    .wayFinder(world.rooms[functions
      .creatureFindingInWorld(world.rooms, creature, 'room')], world.Matrix);
  // Using array with exits, we are checking if
  // there any matches with an argument, also count failed comparisons.
  let counter = 0;
  for (let i = 0; i < exits.length; i++) {
    if (exits[i] === argument) {
      world
        .moveCreature(world.rooms[functions
          .creatureFindingInWorld(world.rooms, creature, 'room')],
        world.rooms[argument], creature);
    } else {
      counter++;
      if (counter === exits.length) {
        ctx.reply('Incorrect number!');
      }
    }
  }
};

const where = (creature, ctx, world) => {
  // Let's find you!
  ctx
  .reply(creature.getName() + ' is in a room #' + (functions
      .creatureFindingInWorld(world.rooms, creature, 'room') + 1)); 
      //+1 because numbers in array and 
      //numeration of rooms are different
};

const ways = (creature, ctx, world) => {
  // If you are looking for some ways to go.
  functions
    .lookAround(world.rooms[functions
      .creatureFindingInWorld(world.rooms, creature, 'room')], world.Matrix, ctx);
};

//Let's find all Creatures in the room!
const explore = (creature, world, key, ctx) => {
  switch(key){
    case 'array':
      break;
    case 'reply':
        let room = world.rooms[functions.creatureFindingInWorld(world.rooms, creature, 'room')];
        let redused = [];
        let i = 0;
        room.creatureList.forEach(creature => {
          redused[i] = creature.getName();
          i++;
        }); 
        const reducer = (accumulator, currentValue) => currentValue + ", " + accumulator;
        let answ = redused.reduce(reducer);
        answ.slice(answ.length, answ.length);
        ctx.reply(answ);
      break;
  }
}

//Kick the monster!

const kick = (world, creature, argument, ctx) => {
  let roomNumber = functions.creatureFindingInWorld(world.rooms, creature, 'room'); //number of a room
  let reciever = world.rooms[roomNumber]
  .creatureList
  [functions.creatureFindingByNameinRoom(world.rooms[roomNumber].creatureList, argument)];
  if(reciever === undefined){
    console.log('someone is trying to kick undefined');
    ctx.reply('There is no such creature here!');
  }
  else if(creature.getID()===reciever.getID()){
    console.log('someone is trying to kick himself');
    ctx.reply('sorry, you can\'t kick yourself');
  }
  else{
  world.rooms[roomNumber].fight(reciever, creature);
  }
}

const help = (argument, ctx) => {
  let reply;
  switch(argument){
    case 'help':
      reply = 'Help command allows you to know syntaxix and sense of this command. For example: /help go';
      ctx.reply(reply);
    break;
    case 'go':
      reply = 'Go command is used to move from one room to another. You can use /ways command to figure out, where you can go';
      ctx.reply(reply);
    break;
    case 'kick':
      reply = 'This command allows you to kick someone! You can use /explore to figure out, who is gonna be kicked';
      ctx.reply(reply);  
    break;
    case 'where':
      reply = 'This command allows you to understand where are you';
      ctx.reply(reply);  
    break;
    case 'ways':
      reply = 'This command allows you to know da way';
      ctx.reply(reply);
      break;
    case 'explore':
      reply = 'This command allows you to know who is in the room';
      ctx.reply(reply);
    break;
  default:
    reply = 'Invalid command. Try /help help';
    ctx.reply(reply);
    break;
  }
}

// This function determinates where should commands
// and arguments go, also it manages additional data.
const determinant = (command, argument, creature, ctx, world, bot) => {
  switch(command){
    case 'go':
        bot.command(command, go(argument, creature, ctx, world));
        break;
    case 'where':
        bot.command(command, where(creature, ctx, world));
        break;
    case 'ways':
        bot.command(command, ways(creature, ctx, world));
        break;
    case 'explore':
        bot.command(command, explore(creature, world, 'reply', ctx));
        break;
    case 'kick':
        bot.command(command, kick(world, creature, argument, ctx));
        break;
    case 'help':
        bot.command(command, help(argument, ctx));
        break;
    default:{
        let reply = 'There is no such command.';
        ctx.reply(reply);
        }
      break;
}
};

// This function parses user's messages on commands and arguments.
const ear = (ctx, creature, world, bot) => {
  let text = ctx.message.text;

  const index = text.indexOf(' ');

  let command;
  let argument;

  if(index === -1){
    command = text.replace('/', '');
  }
  else{
    command = text.slice(0, index).replace('/', '');
    argument = text.slice(index+1);
  }

  console.log('The commnad: ' + command);
  console.log('The argument: ' + argument);
  
    determinant(command, argument, creature, ctx, world, bot);
};

// Exportation

module.exports = {
  ear,
  determinant,
  explore,
};