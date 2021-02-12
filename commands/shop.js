const Discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
module.exports = {
	name: 'shop',
	description: '',
  cooldown: 0,
  aliases: ['s'],
	execute(bot, msg, args, botprefix) {
  const shop = new Discord.MessageEmbed().setTitle("Welcome to the shop").setColor(0x00008B).setDescription(`Welcome to the shop. You can spend your  Dogecoin here for stuff\nYou can use ${botprefix}buy [number]`)
    .addField("Profile colors", `
    1. Red for 1000 Dogecoin
    2. Orange for 1000 Dogecoin
    3. Light Green for 1000 Dogecoin
    4. Dark green for 1500 Dogecoin
    5. Light blue for 1200 dogecoin
    6. Pink for 1000 Dogecoin
    7. Purple for 1100 Dogecoin
    8. White for 1200 Dogecoin
    9. Black for 1200 Dogecoin`)
    .addField("Multipliers", `

    ***Buying multiple multipliers will nullify the old one***

		10. 1.5x multiplier for 6 hours for 500 coins
    11. 2x multiplier for 6 hours for 800 coins
    12. 3x multiplier for 6 hours for 1200 coins
    13. 5x multiplier for 6 hours for 1800 coins
    14. 1.5x multiplier for 12 hours for 1000 coins
    15. 2x multiplier for 12 hours for 1400 coins
    16. 3x multiplier for 12 hours for 2000 coins
    17. 5x multiplier for 12 hours for 3200 coins
    18. 1.5x multiplier for 1 day for 1600 coins
    19. 2x multiplier for 1 day for 2200 coins
    20. 3x multiplier for 1 day for 3000 coins
    21. 5x multiplier for 1 day for 4200 coins
    22. 1.5x multiplier for 3 days for 4000 coins
    23. 2x multiplier for 3 days for 6000 coins
    24. 3x multiplier for 3 days for 8000 coins
    25. 5x multiplier for 3 days for 15000 coins`)
    msg.channel.send(shop)
	},
};
