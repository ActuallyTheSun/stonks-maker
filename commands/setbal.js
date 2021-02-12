const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'setbal',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
  if (msg.author.id !== "") return;
    else {
    let setbaluser = msg.mentions.users.first() || bot.users.get(args[1])
    let newcoinssetbal = Number(args[2])
    const setbalembed = new Discord.MessageEmbed().setColor(0x00FF00).setDescription("Set " + setbaluser + "\'s dogecoin to " + newcoinssetbal)
    msg.channel.send(setbalembed)
    coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
    coins[setbaluser.id] = {
      coins: newcoinssetbal
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    })
    }
	},
};
