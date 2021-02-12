const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'buy',
	description: '',
  cooldown: 0,
	execute(bot, msg, args, botprefix) {
  let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
    let cost = "bugs are fun"
    let result = "idk i dont yet"
    let type = 0
    if (args[0] === "1") {
      cost = 1000
      result = "0xFF0000"
      type = 1
    }
    else if (args[0] === "2") {
      cost = 1000
      result = "0xFF8000"
      type = 1
    }
    else if (args[0] === "3") {
      cost = 1000
      result = "0x00FF00"
      type = 1
    }
    else if (args[0] === "4") {
      cost = 1500
      result = "0xBFFF00"
      type = 1
    }
    else if (args[0] === "5") {
      cost = 1200
      result = "0x00FFFF"
      type = 1
    }
    else if (args[0] === "6") {
      cost = 1000
      result = "0xFF00FF"
      type = 1
    }
    else if (args[0] === "7") {
      cost = 1100
      result = "0xBF00FF"
      type = 1
    }
    else if (args[0] === "8") {
      cost = 1200
      result = "0xFFFFFF"
      type = 1
    }
    else if (args[0] === "9") {
      cost = 1200
      result = "0x000000"
      type = 1
    }
    else if (args[0] === "10") {
      cost = 500
      result = 1.5
      time = 21600
      type = 2
    }
    else if (args[0] === "11") {
      cost = 800
      result = 2
      time = 21600
      type = 2
    }
    else if (args[0] === "12") {
      cost = 1200
      result = 3
      time = 21600
      type = 2
    }
    else if (args[0] === "13") {
      cost = 1800
      result = 5
      time = 21600
      type = 2
    }
    else if (args[0] === "14") {
      cost = 1000
      result = 1.5
      time = 43200
      type = 2
    }
    else if (args[0] === "15") {
      cost = 1400
      result = 2
      time = 43200
      type = 2
    }
    else if (args[0] === "16") {
      cost = 2000
      result = 3
      time = 43200
      type = 2
    }
    else if (args[0] === "17") {
      cost = 3200
      result = 5
      time = 43200
      type = 2
    }
    else if (args[0] === "18") {
      cost = 1600
      result = 1.5
      time = 86400
      type = 2
    }
    else if (args[0] === "19") {
      cost = 2200
      result = 2
      time = 86400
      type = 2
    }
    else if (args[0] === "20") {
      cost = 3000
      result = 3
      time = 86400
      type = 2
    }
    else if (args[0] === "21") {
      cost = 4200
      result = 5
      time = 86400
      type = 2
    }
    else if (args[0] === "22") {
      cost = 4000
      result = 1.5
      time = 259200
      type = 2
    }
    else if (args[0] === "23") {
      cost = 6000
      result = 2
      time = 259200
      type = 2
    }
    else if (args[0] === "24") {
      cost = 8000
      result = 3
      time = 259200
      type = 2
    }
    else if (args[0] === "25") {
      cost = 15000
      result = 5
      time = 259200
      type = 2
    }
    else {
      const notvaliditem = new Discord.MessageEmbed().setColor(0xFF0000).setDescription("That is not a valid item!")
      msg.channel.send(notvaliditem)
      return;
    }
    if (cost > coins[msg.author.id].coins) {
      const errorcoinserror = new Discord.MessageEmbed().setColor(0xFF0000).setDescription("You have less coins that what you need to buy this item")
      msg.channel.send(errorcoinserror)
      return;
    }
    else {
    let newcoins = Number(coins[msg.author.id].coins) - Number(cost)
    coins[msg.author.id] = {
      coins: newcoins
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    })
    if (type === 1) {
  profilecolor = JSON.parse(fs.readFileSync("./profilecolors.json", "utf8"));
    profilecolor[msg.author.id] = {
      profilecolor: result
    };
    fs.writeFile("./profilecolors.json", JSON.stringify(profilecolor), (err) => {
      if (err) console.log(err)
    })
  }
  else if (type === 2) {
    multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"));
    multiplier[msg.author.id] = {
      multiplier: result
    };
    fs.writeFile("./multiplier.json", JSON.stringify(multiplier), (err) => {
      if (err) console.log(err)
    })
    let timee = moment().unix() + time
    multipliertime = JSON.parse(fs.readFileSync("./multipliertime.json", "utf8"));
    multipliertime[msg.author.id] = {
      multipliertime: timee
    };
    fs.writeFile("./multipliertime.json", JSON.stringify(multipliertime), (err) => {
      if (err) console.log(err)
    })
    }
    msg.channel.send(new Discord.MessageEmbed().setColor(0x00FF00).setDescription("Succecfully purchased that item"))
    }
	},
};
