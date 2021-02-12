const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'restart',
	description: '',
  aliases: ['reload'],
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
    if (msg.author.id != "") return;
    if (!args.length) return/*{
			const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				delete require.cache[require.resolve(`./${file}`)];
				const command = require(`./${file}`);
				bot.commands.set(command.name, command);
			}
			msg.channel.send("reloaded all commands")
		}*/
  const commandName = args[0].toLowerCase();
  const command = bot.commands.get(commandName)
	|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if (!command) return msg.channel.send(`Could not find the ${commandName} command`);

delete require.cache[require.resolve(`./${command.name}.js`)];
try {
	const newCommand = require(`./${command.name}.js`);
	bot.commands.set(newCommand.name, newCommand);
} catch (error) {
	console.error(error);
	msg.channel.send(new Discord.MessageEmbed().setColor("0xFF0000").setDescription(`There is an error in the ${commandName} command: \`\`\`${error.stack}\`\`\``));
  return;
}
msg.channel.send(new Discord.MessageEmbed().setColor("0x00FF00").setDescription(`Succesfully reloaded the ${commandName} command!`));
  }
};
