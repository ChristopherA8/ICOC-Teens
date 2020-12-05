const Discord7845 = require('discord.js');
module.exports = {
  name:"topwarns",
  execute(msg) {

    if (msg.member.hasPermission('KICK_MEMBERS')) {

      const SQLite = require('better-sqlite3');

      // Create SQLite database
      const sql = new SQLite('./databases/warns.sqlite');

      const warns = sql.prepare("SELECT * FROM warns ORDER BY warns DESC LIMIT 3").all();
        function warnEmbed(msg, warns) {
            const exampleEmbed = new Discord7845.MessageEmbed()
            .setAuthor(`Top 3 Warns:`)
            .setColor('#00FF86');
            for (const warned of warns) {
                    exampleEmbed.addField(`${warned.name}`, `${warned.warns}`);
            }
            msg.channel.send(exampleEmbed);
          }

        if (warns == undefined) {
            msg.channel.send(`No Warns!`)
        } else {
          warnEmbed(msg, warns);
        }
      } else {
        msg.channel.send(`**Error:** Missing Permissions!`);
    }
  },
};