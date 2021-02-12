const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'stats',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
    const properuptime = `${Math.floor((bot.uptime/(1000*60*60*24))%60)} days, ${Math.floor((bot.uptime/(1000*60*60))%60)} hours, ${Math.floor((bot.uptime/(1000*60))%60)} minutes, ${Math.floor((bot.uptime/1000)%60)} seconds`
    const stats = new Discord.MessageEmbed().setTitle("Bot stats").setColor(0x00008B).setDescription(`
Prefix: ${botprefix} (default: $)
Servers: ${bot.guilds.cache.size}
Ping: ${(new Date().getTime() - msg.createdTimestamp)} ms
Uptime: ${properuptime}`)
    msg.channel.send(stats)
  }
}
