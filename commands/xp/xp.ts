const Discord476032 = require('discord.js');
module.exports = {
    name:"xp",
    execute(msg) {

        const SQLite = require('better-sqlite3');

        // Create SQLite database
        const sql = new SQLite('./databases/scores.sqlite');

        sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
        sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, name) VALUES (@id, @user, @guild, @points, @level, @name);");
        

        const ping = msg.mentions.members.first();
        //dont mind this mess of if elses.............. I don't care enough to fix it
        if (!ping) {
            let score;
            score = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?").get(msg.author.id, "698590629344575500");
            if (score == undefined) {
                msg.channel.send(`Talk first to get xp!`);
            } else {
                const exampleEmbed = new Discord476032.MessageEmbed()
                .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
                .setColor('#00FF86')
                .addFields(
                { name: '**❯ XP:**', value: `${score.points}`, inline: true},
                { name: '**❯ Level:**', value: `${score.level}`, inline: true}
                )
                msg.reply(exampleEmbed);
            }
        } else {
            let scorePing;
            scorePing = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?").get(ping.id, msg.guild.id);
            if (scorePing == undefined) {
                msg.channel.send(`They need to talk first to get xp!`);
            } else {
                const exampleEmbed = new Discord476032.MessageEmbed()
                .setAuthor(`${ping.displayName}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
                .setColor('#00FF86')
                .addFields(
                { name: '**❯ XP:**', value: `${scorePing.points}`, inline: true},
                { name: '**❯ Level:**', value: `${scorePing.level}`, inline: true}
                )
                msg.reply(exampleEmbed);
            }
        }

    },
};