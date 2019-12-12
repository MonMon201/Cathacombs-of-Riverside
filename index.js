'use strict';
// Bot token
const token = '781815051:AAHu04D02Ur277_4ZY21H_cAawfMqyIn_wo';

// Modules
const join = require('path').join;
const classes = require(join(__dirname, 'src', 'classes.js'));
const determinant = require(join(__dirname, 'src', 'determinant.js'));
const Telegraf = require('telegraf');

const functions = require(join(__dirname, 'src', 'functions.js'));

// Connecting to the bot
const bot = new Telegraf(token);

// world creation
const world = new classes.World([]);

// starting bot
bot.start(ctx => ctx.reply('Welcome!'));

// World building
world.addRoom((new classes.Room(0, [])));
world.addRoom((new classes.Room(1, [])));
world.addRoom((new classes.Room(2, [])));
world.addConnector(world.rooms[0], world.rooms[1]);
world.addConnector(world.rooms[0], world.rooms[2]);

world.rooms[0].addCreature(new classes.Creature('Beth', 100, 15));
world.rooms[0].addCreature(new classes.Creature('Big Rat', 20, 16));
world.rooms[0].addCreature(new classes.Creature('Small Rat', 15, 5));

let ID = world.rooms[0].creatureList[0].getID();

// Ear of a bot

bot.on('text', ctx => determinant.ear(ctx, functions.creatureGetter(world, ID), world, bot));

bot.launch();