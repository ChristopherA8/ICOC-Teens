// module.exports = {
//     name:"shop",
//     execute(msg) {

//         // Discord Embeds
//         const discord322 = require('discord.js');
//         const fs = require('fs');

//         let jsonData = fs.readFileSync('./commands/commerce/shop.json');
//         let shop = JSON.parse(jsonData);

//         // Shop Embed
//         const embed = new discord322.MessageEmbed()
//         .setAuthor('Shop:')
//         .setColor('#00FF86');
//         for (const item of shop.items) {
//             embed.addFields({ name:`Name: ${item.name} x${item.quantity}`, value: `Price: ₪${item.price}  |  ID: ${item.id}` })
//         }

//         msg.reply(embed);

//     },
// };
