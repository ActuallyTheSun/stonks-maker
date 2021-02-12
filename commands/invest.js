const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'invest',
	description: '',
  cooldown: 60,
  aliases: ['i'],
	execute(bot, msg, args, botprefix) {
    let iargs = msg.content.substring(botprefix.length).split(" ");
  let multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"));
    let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
    let bet = "a"
    if (iargs[1] === "all") bet = coins[msg.author.id].coins
    else bet = Number(iargs[1])
    let time = Number(iargs[2])
    if (!bet || !time) {
      const embeed = new Discord.MessageEmbed().setColor(0x87CEEB).setDescription(`You can invest by using ${botprefix}invest [money] [time]. Investing for a longer time can increase by how much the currency infates, but also increases the chance of the currency crashing
*Example:* ${botprefix}invest 100 10`)
      msg.channel.send(embeed)
    }
    else if (bet > coins[msg.author.id].coins) {
      const embeeed = new Discord.MessageEmbed().setColor(0xFF0000).setDescription("You cannot invest more than you have.")
      msg.channel.send(embeeed)
    }
    else if (bet < 1 || time < 1) {
      const embeeeed = new Discord.MessageEmbed().setColor(0xFF0000).setDescription("You have to invest something!")
      msg.channel.send(embeeeed)
    }
    else {
    let stonk = (Math.floor(Math.random() * (10 + (bet / 4)))) * multiplier[msg.author.id].multiplier
    stonk = stonk / 4
    if (stonk == 1) stonk = stonk / 4
    else if (stonk == 2) stonk = stonk / 3
    else if (stonk == 3) stonk = stonk / 2
    for (i=0;i>time;i++) {
      const o = (i+4)/2
      stonk = stonk + time * o * i
    }
    stonk = Math.floor(stonk)
    if (stonk <= 0) stonk = 1
    let crash = Math.floor(Math.random() * ((100 - (15 + time / 3)) - (multiplier[msg.author.id].multiplier * 4)))
    if (crash < 1) crash = 1
    if (crash === 1) {
      let crashcoins = Number(coins[msg.author.id].coins) - Number(Math.floor(bet / 5 * 4))
      coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
      coins[msg.author.id] = {
      coins: crashcoins
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    })
    const oof = new Discord.MessageEmbed().setTitle("not stonks").setColor(0xFF0000).setDescription("Dogecoin  CRASHED! Those are some bad news, because you lost **" + (bet / 5 * 4) + "** dogecoin!")
    msg.channel.send(oof)
    }
    else {
      let stonkcoins = Number(coins[msg.author.id].coins) + Number(stonk)
      coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
      coins[msg.author.id] = {
      coins: stonkcoins
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    })
    const stonksembed = new Discord.MessageEmbed().setTitle("stonks!").setColor(0X00FF00).setDescription("Dogecoin raised in value, and you earned **" + Number(stonk) + "** Dogecoin!")
    msg.channel.send(stonksembed)
    }
    }
	},
};
