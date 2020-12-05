module.exports = {
    name:"clearwarns",
    execute(msg) {
  
        if (msg.member.hasPermission('KICK_MEMBERS')) {
  
        const SQLite = require('better-sqlite3');
        const ping = msg.mentions.members.first();
  
        // Create SQLite database
        const sql = new SQLite('./databases/warns.sqlite');
  
        if (!ping) {
          msg.channel.send(`**Error:** Missing ping!`);
        } else {
          sql.prepare("DELETE FROM warns WHERE id = ?").run(ping.id);
          msg.channel.send(`Warns Cleared for ${ping.user.tag}`);
        }
  
        } else {
            msg.channel.send(`**Error:** Missing Permissions!`);
        }
  
    },
  };