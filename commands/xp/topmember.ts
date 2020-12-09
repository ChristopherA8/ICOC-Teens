module.exports = {
    name:"topmember",
    execute(msg) {

    const Discord3653 = require('discord.js');
    const SQLite = require('better-sqlite3');

    // Create SQLite database
    const sql = new SQLite('./databases/scores.sqlite');

    const top = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 1").get(msg.guild.id);
    const topMem = msg.guild.members.cache.get(top.id.substr(19));
    const embed = new Discord3653.MessageEmbed()
    .setAuthor(`Top XP:`)
    .setDescription(`**${topMem.displayName}**\n**❯ XP:** ${top.points}\n**❯ Level:** ${top.level}`)
    .setThumbnail(`${topMem.user.displayAvatarURL(({dynamic : true}))}`);
    msg.channel.send(embed);

    }
}