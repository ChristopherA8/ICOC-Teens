const Discord1 = require("discord.js");
module.exports = {
  name: "about",
  description: "",
  permissions: 2,
  execute(msg, args) {
    const aboutEmbed = new Discord1.MessageEmbed()
      .setTitle(`About ICOC Teens`)
      .setURL(`https://chr1s.dev`)
      .setAuthor(
        "About!",
        `https://chr1s.dev/assets/boticon.png`,
        "https://chr1s.dev"
      )
      .setColor("#02f2ce")
      .setDescription(
        `\**ICOC Teens\** is an all-purpose discord bot for the discord server "ICOC Teens". It's main purpose is moderation. But, it also includes 75+ informational and fun commands!`
      )
      .setFooter(
        `Developer: Chr1sDev (christopher#8888)`,
        `https://chr1s.dev/assets/verified_dev.png`
      )
      .setThumbnail("https://chr1s.dev/assets/bot4.gif");
    msg.channel.send(aboutEmbed);
  },
};
