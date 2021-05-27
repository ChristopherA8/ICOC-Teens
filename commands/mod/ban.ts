module.exports = {
  name: "ban",
  description: "",
  execute(msg, args) {
    const { Permissions } = require("discord.js");
    //Define member constant
    const member = msg.member;

    const chat = msg.guild.channels.cache.get("698590629344575503");

    //Check member permissions
    if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      //Parse message content
      var input = msg.content;
      var inputArr = input.split(" ");

      //Define pinged member constant
      const ping = msg.mentions.members.first();

      //Check for mention
      if (ping == undefined) {
        msg.channel.send(`\**Error:\** Ping the person you want to ban!`);
      } else if (ping.id == msg.author.id) {
        msg.channel.send(`\**Error:\** You cannot ban yourself!`);
      } else if (ping.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        msg.channel.send(`\**Error:\** You can not ban an Admin!`);
      } else if (inputArr[2] == undefined) {
        chat.send(`${ping} has been banned`);
        ping.ban();
      } else if (inputArr[2] !== undefined) {
        var reasonString = input
          .replace(inputArr[0], "")
          .replace(inputArr[1], "")
          .trim();
        chat.send(`${ping} has been banned for \`${reasonString}\``);
        ping.ban({ reason: reasonString });
      }
    } else {
      msg.channel.send(`\**Error:\** You are missing "ban" perms`);
    }
  },
};
