const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'info',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
  const stonksinfo = new Discord.MessageEmbed().setTitle("About the bot").setColor(0x00008B).setDescription("The stonks maker bot can be used to invest in  **Dogecoin** so you can get the biggest stonks ever").setImage("https://cdn.discordapp.com/attachments/680776962796421204/742006691297755256/epicpicture7577575577557757575757755757.png")
      msg.channel.send(stonksinfo)
	},
};
