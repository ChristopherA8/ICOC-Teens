module.exports = {
    name:"top",
    execute(msg) {
        const Discord6090 = require('discord.js');

        const SQLite = require('better-sqlite3');

        // Create SQLite database
        const sql = new SQLite('./databases/scores.sqlite');

        //msg.channel.send(`**Down for Maintenance**`);

        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10").all(msg.guild.id);
        const exampleEmbed = new Discord6090.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
        .setColor('#00FF86')
        .setDescription(`\`\`\`md\n1. ${top10[0].name} | XP: ${top10[0].points}\n2. ${top10[1].name} | XP: ${top10[1].points}\n3. ${top10[2].name} | XP: ${top10[2].points}\n4. ${top10[3].name} | XP: ${top10[3].points}\n5. ${top10[4].name} | XP: ${top10[4].points}\n6. ${top10[5].name} | XP: ${top10[5].points}\n7. ${top10[6].name} | XP: ${top10[6].points}\n8. ${top10[7].name} | XP: ${top10[7].points}\n9. ${top10[8].name} | XP: ${top10[8].points}\n10. ${top10[9].name} | XP: ${top10[9].points}\n\`\`\``)
        msg.channel.send(exampleEmbed);

    }
}