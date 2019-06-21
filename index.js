'use strict';
// Bot token
const token = 'token';

// Modules
const join = require('path').join;
const classes = require(join(__dirname, 'src', 'classes.js'));
const determinant = require(join(__dirname, 'src', 'determinant.js'));
const Telegraf = require('telegraf');

// connecting to bot
const bot = new Telegraf(require('telegraf'))(token);

// world creation
const world = new classes.World([]);

// starting bot
bot.start(ctx => ctx.reply('Welcome!'));

const creatureName = 'Dania';

// World building
world.addRoom((new classes.Room(0, [])));
world.addRoom((new classes.Room(1, [])));
world.addRoom((new classes.Room(2, [])));
world.rooms[0].addCreature(new classes.Creature(creatureName));
world.addConnector(world.rooms[0], world.rooms[1]);
world.addConnector(world.rooms[0], world.rooms[2]);

// Ear of a bot
bot.on('text', ctx => determinant.ear(ctx, creatureName, world, bot));

bot.launch();


