const Discord784 = require("discord.js");
module.exports = {
  name: "warn",
  execute(msg) {
    const { Permissions } = require("discord.js");
    if (msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      const SQLite = require("better-sqlite3");
      const ping = msg.mentions.members.first();
      const splitArr = msg.content.split(" ");
      const reason = msg.content.substr(5).replace(splitArr[1], "").trim();
      const warner = msg.author;

      // Create SQLite database
      const sql = new SQLite("./databases/warns.sqlite");

      if (!ping) {
        msg.channel.send(`**Error:** Missing ping!`);
      } else {
        const warns = sql
          .prepare("SELECT * FROM warns WHERE id = ?")
          .get(ping.id);
        if (warns == undefined) {
          sql
            .prepare(
              "INSERT OR REPLACE INTO warns (id, name, warns) VALUES (?, ?, ?);"
            )
            .run(ping.id, ping.user.tag, 1);
          msg.channel.send(`${ping.user.tag} has been warned!`);
          msg.client.emit(`guildMemberWarned`, ping, reason, warner); // emitter
        } else {
          sql
            .prepare(
              "INSERT OR REPLACE INTO warns (id, name, warns) VALUES (?, ?, ?);"
            )
            .run(ping.id, ping.user.tag, warns.warns + 1);
          msg.channel.send(`${ping.user.tag} has been warned!`);
          msg.client.emit(`guildMemberWarned`, ping, reason, warner); // emitter

          var check = sql
            .prepare("SELECT * FROM warns WHERE id = ?")
            .get(ping.id);
          if (check.warns == 3) {
            const role = msg.member.guild.roles.cache.get("759587936429277214");
            ping.roles.add(role);
            setTimeout(() => {
              ping.roles.remove(role, `Temporary mute expired.`);
              msg.channel.send(`Temporary mute expired for ${ping}`);
            }, 300000); // time in ms
          } else if (check.warns >= 10) {
            ping.kick();
          }
        }
      }
    } else {
      msg.channel.send(`**Error:** Missing Permissions!`);
    }
  },
};
