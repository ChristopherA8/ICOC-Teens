module.exports = {
  name: "buy",
  permissions: 1,
  execute(msg) {
    const fetch = require("node-fetch");
    const Discord = require("discord.js");

    // Parse the item they want to buy from the command
    let input = msg.content.substr(4).trim();
    if (input === "") {
      msg.reply(`Missing input`);
      return;
    }

    fetch(`http://198.251.72.167:3000/items/${input.toLowerCase()}`)
      .then((res) => res.text())
      .then((out) => {
        if (out === "Item not found") {
          msg.reply(`Item not found`);
          return;
        } else {
          fetch(`http://198.251.72.167:3000/items/${input.toLowerCase()}`)
            .then((res) => res.json())
            .then((out) => {
              const embed = new Discord.MessageEmbed()
                .setTitle(`Are you sure?`)
                .setDescription(`You want to buy ${out.name}`);
              msg.channel.send(embed).then((message) => {
                message.react("✅");
                message.react("❌");
                const filter = (reaction, user) =>
                  (reaction.emoji.name === "✅" && user.id == msg.author.id) ||
                  (reaction.emoji.name === "❌" && user.bot == false);
                const collector = message.createReactionCollector(filter, {
                  maxUsers: 1,
                });
                collector.on("collect", (reaction, user) => {
                  if (reaction.emoji.name == "✅") {
                    msg.reply(`you said yes`);
                  }
                  if (reaction.emoji.name == "❌") {
                    msg.reply(`you said no`);
                  }
                });

                collector.on("end", (collected) => {
                  // Do something when it's done
                  console.log(`Collected ${collected.size} reactions`);
                  console.log(`Collected ${collected.size} items`);
                });
              });
            });
        }
      });
  },
};
