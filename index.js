'use strict';
// Bot token
const token = '781815051:AAHu04D02Ur277_4ZY21H_cAawfMqyIn_wo';

// Modules
const join = require('path').join;
const classes = require(join(__dirname, 'src', 'classes.js'));
const determinant = require(join(__dirname, 'src', 'determinant.js'));
const Telegraf = require('telegraf');

// connecting to bot
const bot = new Telegraf(token);

// world creation
const world = new classes.World([]);

// starting bot
bot.start(ctx => ctx.reply('Welcome!'));

const creatureName = 'Tom';

// World building
world.addRoom((new classes.Room(0, [])));
world.addRoom((new classes.Room(1, [])));
world.addRoom((new classes.Room(2, [])));
world.rooms[2].addCreature(new classes.Creature(creatureName));
world.addConnector(world.rooms[0], world.rooms[1]);
world.addConnector(world.rooms[0], world.rooms[2]);

// Ear of a bot
bot.on('text', ctx => determinant.ear(ctx, creatureName, world, bot));

bot.launch();


