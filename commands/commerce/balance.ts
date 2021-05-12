module.exports = {
  name: "balance",
  execute(msg) {
    // Discord Embeds
    const Discord = require("discord.js");
    const fetch = require("node-fetch");
    // const fs = require("fs");

    // let jsonData = fs.readFileSync('./commands/commerce/members.json');
    // let membersObject = JSON.parse(jsonData);
    // var member = membersObject.members.filter(member => member.id == msg.author.id);

    fetch("http://198.251.72.167:3000/users")
      .then((res) => res.json())
      .then((out) => {
        let member = out.users.filter((user) => user.id == msg.author.id);

        // Member Embed
        const embed = new Discord.MessageEmbed()
          .setAuthor("Balance:", msg.author.displayAvatarURL({ dynamic: true }))
          .setColor("#00FF86")
          .setDescription(`$${member[0].balance}`);

        msg.reply(embed);
      });
  },
};
