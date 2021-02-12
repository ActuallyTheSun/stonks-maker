const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'profile',
	description: '',
  cooldown: 0,
  aliases: ['p', 'balance', 'bal'],
	execute(bot, msg, args, botprefix) {
  let coins = JSON.parse(fs.readFileSync("./coins.json", "utf8"))
      let user = "huts"
      if (!args[0]) user = msg.author
      else user = msg.mentions.users.first() || bot.users.cache.get(args[0])
      if (!user) {
        msg.channel.send(new Discord.MessageEmbed().setColor("0xFF0000").setDescription("Could not find the user you are looking for. Make sure you typed correctly and that user is in the server").setFooter("Note that stonks maker only works with mentions or id's"))
        return;
      }
      if (!coins[user.id]){
        msg.channel.send(new Discord.MessageEmbed().setColor("0xFF0000").setDescription("That user does not a have a profile yet. You can tell them to invest, if you want to"))
        return;
      }
      let profilecolor = JSON.parse(fs.readFileSync("./profilecolors.json", "utf8"))
      let multiplier = JSON.parse(fs.readFileSync("./multiplier.json", "utf8"))
      let multipliertime = JSON.parse(fs.readFileSync("./multipliertime.json", "utf8"))
    function timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = "0" + a.getHours();
      var min = "0" +  a.getMinutes();
      console.log()
      var time = month + ' ' + date + ', ' + hour.substr(-2) + ':' + min.substr(-2)
      return time;
    }
      let userthumbnail = "huts"
      if (!user.displayAvatarURL) userthumbnail = "https://cdn.discordapp.com/attachments/680776962796421204/739780113859608596/0009876756748464876.png"
      else userthumbnail = user.displayAvatarURL({ dynamic: true, size: 2048})
      let multipliertext = "Error!"
      if (multiplier[user.id].multiplier === 1) multipliertext = "Current multiplier: x1"
      //else multipliertext = `Current multiplier: x${JSON.stringify(multiplier[user.id].multiplier)}
//Multiplier will end on ${timeConverter(multipliertime[user.id].multipliertime)}`
      else multipliertext = `Current multiplier: x${JSON.stringify(multiplier[user.id].multiplier)}`
      let profilee = new Discord.MessageEmbed().setTitle(`${user.username}'s profile`).setColor(profilecolor[user.id].profilecolor)
      .addField("Dogecoin:", Math.floor(coins[user.id].coins) + " dogecoin ")
      .addField("Multiplier:", multipliertext)
      .setThumbnail(userthumbnail)
      if(multiplier[user.id].multiplier !== 1) {
        profilee.setFooter("Multiplier will end on:")
        profilee.setTimestamp(new Date(multipliertime[user.id].multipliertime * 1000))
      }
      msg.channel.send(profilee)
	},
};
