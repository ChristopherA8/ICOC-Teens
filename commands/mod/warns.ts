const Discord7842 = require('discord.js');
module.exports = {
  name:"warns",
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
          sql.prepare("INSERT OR REPLACE INTO warns (id, name, warns) VALUES (?, ?, ?);").run(ping.id, ping.user.tag, 0);
          warnEmbed(msg, ping, warns);
        } else {
          warnEmbed(msg, ping, warns);
        }
      }

      } else {
        msg.channel.send(`**Error:** Missing Permissions!`);
      }

  },
};

function warnEmbed(msg, ping, warns) {
  const exampleEmbed = new Discord7842.MessageEmbed()
  .setAuthor(`${ping.user.tag}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
  .setColor('#00FF86')
  .setDescription(`Warns: ${warns ? warns.warns : '0'}`)
  msg.channel.send(exampleEmbed);
}