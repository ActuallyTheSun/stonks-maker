const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'daily',
	description: '',
  cooldown: 0,
  aliases: ['d'],
	execute(bot, msg, args, botprefix) {
  let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
  let daily = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
  let multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"));
    let claimable = "Error!"
      let claimtime = moment().unix()
      if (Number(claimtime) - Number(daily[msg.author.id].daily) < 86400) claimable = "0"
      else claimable = "1"
      if (claimable === "1") {
        let newcoins = Number(coins[msg.author.id].coins) + (75 * multiplier[msg.author.id].multiplier)
        coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
        coins[msg.author.id] = {
        coins: Number(newcoins)
        };
        fs.writeFile("./coins.json", JSON.stringify(coins),   (err) => {
        if (err) console.log(err)
        })
        daily = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
        daily[msg.author.id] = {
        daily: moment().unix()
        };
        fs.writeFile("./daily.json", JSON.stringify(daily),   (err) => {
        if (err) console.log(err)
        })
        const claimed = new Discord.MessageEmbed().setTitle("stonks!").setColor(0X00FF00).setDescription(`You have claimed your daily **${75*multiplier[msg.author.id].multiplier}**  Dogecoins!`)
        msg.channel.send(claimed)
      }
      else if (claimable === "0") {
        let dfgerrety = Number(claimtime) - Number(daily[msg.author.id].daily)
        let prepare = 86400 - dfgerrety
        let hours = Math.floor(prepare / 3600)
        let minutes = Math.floor((prepare % 3600) / 60)
        let readyin = hours + "h " + minutes + "m "
        const notclaimed = new Discord.MessageEmbed().setTitle("not stonks").setColor(0xFF0000).setDescription(`You cannot claim your daily ${75*multiplier[msg.author.id].multiplier}  Dogecoins yet. The daily investment is open in ` + readyin)
        msg.channel.send(notclaimed)
      }
	},
};
