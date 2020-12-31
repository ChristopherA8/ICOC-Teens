module.exports = {
    name:"server",
    execute(msg) {

        const Discord = require('discord.js');
        var guild = msg.guild;
        var created = new Date(guild.createdTimestamp);

        const embed = new Discord.MessageEmbed()
        .setAuthor(msg.guild.name, `https://cdn.discordapp.com/icons/698590629344575500/edb1e958f2886729a61a0ee5dd8da69e.webp`)
        .setColor(`#2A78E8`)
        .setFooter(``)
        .setDescription(`**Server Info:**`)
        .addFields(
            { name: `Created:`, value: `${created.getMonth()}/${created.getDay()}/${created.getFullYear()}` },
            { name: `Default Message Notifs:`, value: `${guild.defaultMessageNotifications}` },
            { name: `Features:`, value: `${guild.features.join(' | ')}` },
            { name: `Region:`, value: `${guild.region}` },
        );

        msg.channel.send(embed);

    },
};