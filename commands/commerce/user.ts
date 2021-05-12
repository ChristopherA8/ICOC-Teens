module.exports = {
  name: "user",
  permissions: 1,
  execute(msg) {
    const fetch = require("node-fetch");
    fetch(`http://198.251.72.167:3000/users/${msg.author.username}`)
      .then((res) => res.json())
      .then((out) => {
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed()
          .setAuthor(out.name)
          .addFields(
            { name: "Balance", value: out.balance },
            { name: "Items", value: out.items.length }
          );
        msg.channel.send(embed);
      });
  },
};
