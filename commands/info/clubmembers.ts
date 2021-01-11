module.exports = {
    name:"clubmembers",
    execute(msg) {

        let clubsCategory = msg.guild.channels.cache.get('768878986280829019'); // Clubs category
        var clubs = clubsCategory.children.filter(club => club.id !== `798032803928342549`); // Club channels minus #club-list

        // msg.channel.send(JSON.stringify(clubs, null, 4), { code: 'json', split: true });

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
        .setAuthor('Club Members');
        clubs.forEach(club => {
            embed.addField(club.name, `\`Members: ${club.permissionOverwrites.size}\``, true);
        });
        msg.channel.send(embed);

    },
};