const Discord784 = require('discord.js');
module.exports = {
  name:"warn",
  execute(msg) {

    if (msg.member.hasPermission('KICK_MEMBERS')) {

      const SQLite = require('better-sqlite3');
      const ping = msg.mentions.members.first();

      // Create SQLite database
      const sql = new SQLite('./databases/warns.sqlite');

      if (!ping) {
        msg.channel.send(`**Error:** Missing ping!`);
      } else {
        const warns = sql.prepare("SELECT * FROM warns WHERE id = ?").get(ping.id);
        if (warns == undefined) {
          sql.prepare("INSERT OR REPLACE INTO warns (id, name, warns) VALUES (?, ?, ?);").run(ping.id, ping.user.tag, 1);
          msg.channel.send(`${ping.user.tag} has been warned!`);
        } else {
            sql.prepare("INSERT OR REPLACE INTO warns (id, name, warns) VALUES (?, ?, ?);").run(ping.id, ping.user.tag, warns.warns + 1);
            msg.channel.send(`${ping.user.tag} has been warned!`);
            var check = sql.prepare("SELECT * FROM warns WHERE id = ?").get(ping.id);
            if (check.warns == 3) {
                const role = msg.member.guild.roles.cache.get('759587936429277214');
                ping.roles.add(role);
                setTimeout(() => {
                    ping.roles.remove(role, `Temporary mute expired.`);
                    msg.channel.send(`Temporary mute expired for ${ping}`);
                }, 300000); // time in ms
            }
        }
      }

      } else {
          msg.channel.send(`**Error:** Missing Permissions!`);
      }

  },
};