module.exports = {
  name: "mute",
  description: "",
  execute(msg, args) {
    const { Permissions } = require("discord.js");
    const chat = msg.guild.channels.cache.get("698590629344575503");

    const member = msg.member;
    if (member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      var input = msg.content;
      var reason = input.substr("29").trim();
      const ping = msg.mentions.members.first();
      const role = msg.member.guild.roles.cache.get("759587936429277214");

      if (ping == undefined) {
        msg.channel.send(`\**Error:\** Ping the person you want to mute!`);
      } else if (ping.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        msg.channel.send(`\**Error:\** You can not mute an Admin!`);
      } else if (reason !== "") {
        chat.send(`${ping} has been muted for \`${reason}\``);
        ping.roles.add(role);
      } else if (reason == "") {
        chat.send(`${ping} has been muted`);
        ping.roles.add(role);
      }
    } else {
      msg.channel.send(`\**Error:\** You are missing "Mute Member" perms`);
    }
  },
};
