module.exports = {
  name: "shop",
  execute(msg) {
    // Discord Embeds
    const discord322 = require("discord.js");
    // const fs = require("fs");

    // let jsonData = fs.readFileSync("./commands/commerce/shop.json");
    // let shop = JSON.parse(jsonData);

    const fetch = require("node-fetch");
    fetch("http://198.251.72.167:3000/items")
      .then((res) => res.json())
      .then((out) => {
        // Shop Embed
        const embed = new discord322.MessageEmbed()
          .setAuthor("Shop:")
          .setColor("#00FF86");
        for (const item of out.items) {
          embed.addFields({
            name: `Name: ${item.name}`,
            value: `Price: $${item.price}\nQuantity: ${item.quantity}`,
            inline: true,
          });
        }

        msg.channel.send(embed);
      });
  },
};
