const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'setprefix',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
    if (!msg.member.permissions.has("MANAGE_GUILD")) return msg.channel.send(new Discord.MessageEmbed().setColor("0xff0000").setDescription("You need the \`Manage Server\` permission to use this"))
        if (!args[0]) return msg.channel.send(new Discord.MessageEmbed().setColor("0xff0000").setDescription(`You need to specify a prefix to use this command\nBy the way, by adding a * at the end, it means adding a space at the end (${botprefix}setprefix doge * will make the prefix \`doge \`)`))
        let changeTo = args[0]
        if (args[1] == "*") changeTo = changeTo + " "
          let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
          prefixes[msg.guild.id] = {
            prefixes: changeTo
          };
          fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
            if (err) console.log(err);
          });
          const embeed = new Discord.MessageEmbed().setTitle("Succes").setColor("0x00FF00")
          .setDescription(`The bprefix has been sucesfully changed to \`${changeTo}\``)
          if (args[1] != "*") embeed.addField("By the way", `by adding a * at the end, it means adding a space at the end (${changeTo}setprefix doge * will make the prefix \`doge \`)`)
          msg.channel.send(embeed)
	},
};
