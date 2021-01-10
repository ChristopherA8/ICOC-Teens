module.exports = {
    name:"stats",
    execute(msg) {

        const fs = require('fs');
        const Discord = require('discord.js');

        let data = fs.readFileSync(`./stats.json`);
        var object = JSON.parse(data);

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Channel Stats`);
        object.stats.forEach(channel => {
            embed.addField(channel.name, `Messages: ${channel.messages}`);
        });

        msg.channel.send(embed);

    },
};