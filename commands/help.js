const Discord = require(`discord.js`)
const fs = require(`fs`)
const moment = require(`moment`)
module.exports = {
	name: 'help',
	description: '',
  cooldown: 0,
  aliases: ['h'],
	execute(bot, msg, args, botprefix) {
    const newhelp = new Discord.MessageEmbed().setTitle(`Help`).setColor(`0x00008B`).addField(`General`, `${botprefix}info: Shows what this bot is about
${botprefix}stats: Check how the bot is doing
${botprefix}help: Have a guess (${botprefix}h)`).addField(`Investing`, `
${botprefix}invest: Invest in  **Dogecoin.** Investing for a longer time can increase rewards, but also increases the chance of the currency crashing (${botprefix}i)
${botprefix}profile: View your or someone else's investments (${botprefix}p, ${botprefix}bal, ${botprefix}balance)
${botprefix}shop: View a shop with intresting items (${botprefix}s)
${botprefix}daily: Get some daily dogecoin (${botprefix}d)`)
.setImage(`https://cdn.discordapp.com/attachments/680776962796421204/742006691297755256/epicpicture7577575577557757575757755757.png`) //ill probably keep this up
    msg.channel.send(newhelp)
	},
};
