const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'eval',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix, dbl) {
    const evalusers = [""]
    const check = evalusers.indexOf(msg.author.id)
    if (check === -1) return;
        else {
        let evalargs = msg.content.split(" ").slice(1)
        let code = evalargs.join(" ")
        try {
          eval(code)
        }
        catch(e) {
        let errorr = new Discord.MessageEmbed().setTitle("Something has gone wrong").setColor(0xFF0000).addField(e.name, e.message)
        msg.channel.send(errorr)
        }
        }
	},
};
