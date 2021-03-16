const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const config = require("./config.json")
const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } })
bot.commands = new Discord.Collection()
const cooldowns = new Discord.Collection();
var prefix2 = "stonks "

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

setInterval(() => {
  fs.copyFileSync("./coins.json", "./backup/coins.json")
}, 3600000)

bot.on("ready", () => {
  console.log(`${bot.user.tag}, ${bot.user.id}`)
  bot.user
    .setActivity(`in the stonks world | $help`, {
      type: "PLAYING"
    })
    .catch(console.error);
})

bot.on("message", msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
	const dropchance = Math.floor(Math.random() * 100)
  if (dropchance == 0) {
    if (msg.author.bot) return;
    const moneydropped = Math.floor(Math.random() * 50 + 1)
    msg.channel.send(new Discord.MessageEmbed().setTitle("Money!").setColor("0x00008B").setDescription(`${moneydropped} dogecoin  have been dropped! React fast to get them!`))
		.then(embed => {
      const emoji = "🥇" //need a placeholder for the custom emoji
      embed.react(emoji)
			const filter = (reaction, user) => {
	return ["🥇"].includes(reaction.emoji.name) && user != bot.user && coins[user.id]
};

embed.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();
		const ruser = reaction.users.cache.find(u => u.id != bot.user.id)
			let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
			if (!coins[ruser.id]) return;
			try {
			const currentcoins = coins[ruser.id].coins
			coins[ruser.id] = {
				coins: Number(currentcoins) + Number(moneydropped)
			};
			fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
				if (err) console.log(err)
			})
			const happyembed = new Discord.MessageEmbed().setTitle("stonks!").setColor("0x00FF00").setDescription(`**${ruser.tag}** collected the ${moneydropped} dogecoin `)
			embed.edit(happyembed)
		} catch(e) {
			msg.channel.send(`\`\`\`js
${e}\`\`\``)
		}
	})
	.catch(collected => {
		const sadembed = new Discord.MessageEmbed().setTitle("not stonks").setColor("0xFF0000").setDescription(`No one collected the ${moneydropped} dogecoin `)
		embed.edit(sadembed)
	});
})
}
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
if (!prefixes[msg.guild.id]) {
	prefixes[msg.guild.id] = {
		prefixes: "$"
	};
}
let botprefix = prefixes[msg.guild.id].prefixes;
  if (!msg.content.toLowerCase().startsWith(botprefix.toLowerCase()) && !msg.content.toLowerCase().startsWith(prefix2.toLowerCase())) return;
  var args = "f"
  if (msg.content.startsWith(botprefix)) args = msg.content.slice(botprefix.length).trim().split(/ +/);
  else if (msg.content.startsWith(prefix2)) args = msg.content.slice(prefix2.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
  const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
   let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
    if (!coins[msg.author.id]) {
       coins[msg.author.id] = {
         coins: "100"
       };
       fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
         if (err) console.log(err)
       })
     let multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"));
       multiplier[msg.author.id] = {
         multiplier: 1
       };
       fs.writeFile("./multiplier.json", JSON.stringify(multiplier), (err) => {
         if (err) console.log(err)
       })
     let multipliertime = JSON.parse(fs.readFileSync("./multipliertime.json", "utf8"));
       multipliertime[msg.author.id] = {
         multipliertime: "0"
       };
       fs.writeFile("./multipliertime.json", JSON.stringify(multipliertime), (err) => {
         if (err) console.log(err)
       })
     let daily = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
       daily[msg.author.id] = {
         daily: "1"
       };
       fs.writeFile("./daily.json", JSON.stringify(daily), (err) => {
         if (err) console.log(err)
       })
     let profilecolor = JSON.parse(fs.readFileSync("./profilecolors.json", "utf8"));
   if (!profilecolor[msg.author.id]){
      profilecolor[msg.author.id] = {
        profilecolor: "0x00008B"
      };
      fs.writeFile("./profilecolors.json", JSON.stringify(profilecolor), (err) => {
        if (err) console.log(err)
      })
   }
       msg.channel.send(new Discord.MessageEmbed().setColor("0x00008B").setDescription(`Set you up to use the bot. Good luck on your investments!
*Please redo your command*`))
return;
    }
    let multipliertime = JSON.parse(fs.readFileSync("./multipliertime.json", "utf8"));
    if (multipliertime[msg.author.id].multipliertime < moment().unix() && multipliertime[msg.author.id].multipliertime !== "0") {
      let multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"));
      multiplier[msg.author.id] = {
        multiplier: 1
      };
      fs.writeFile("./multiplier.json", JSON.stringify(multiplier), (err) => {
        if (err) console.log(err)
      })
      multipliertime[msg.author.id] = {
        multipliertime: "0"
      };
      fs.writeFile("./multipliertime.json", JSON.stringify(multipliertime), (err) => {
        if (err) console.log(err)
      })
      if (msg.content.startsWith(botprefix)) msg.channel.send(new Discord.MessageEmbed().setColor("0x00008B").setDescription(`Your multiplier has bean cleared!
  *Please redo your command*`))
  return;
     }
if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 0) * 1000;

if (timestamps.has(msg.author.id)) {
  let expirationTime = 0
  if (msg.author.id == "") {} //cooldown bypass because testing
	else expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		const embeeeeed = new Discord.MessageEmbed().setColor(0xFF0000).setDescription(`You must wait ${Math.floor(timeLeft)} seconds before investing again, the currency isnt happy about spammers.`)
    if (commandName == "invest" || commandName == "i")msg.channel.send(embeeeeed)
    else msg.channel.send("Doing commands fast one after another can cause issues. Redo your command and slow down")
    return;
	}
}

timestamps.set(msg.author.id, now);
setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
try {
	command.execute(bot, msg, args, botprefix);
} catch (e) {
  if (commandName == "eval" || commandName == "restart") return;
	/*const guild = bot.guilds.cache.get("")
  const channel = guild.channels.cache.get("")
  channel.send(new Discord.MessageEmbed().setColor("0xFF0000").setTitle(`Error raised by ${msg.author.tag} (${msg.author.id})`).addField("Command", `${msg.content}`).addField("Error", `${e}`))*/
  msg.channel.send(new Discord.MessageEmbed().setTitle("Something went wrong").setColor("0xFF0000").setDescription(`Try doing the command again. If its still now working... wait. I reported the error for you. \`\`\`js
${e}\`\`\``))
}
})

bot.login(config.token)
