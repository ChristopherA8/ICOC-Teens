module.exports = {
    name:"commandslist",
    execute(msg) {

        let commands = msg.client.commands;
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('All Commands');

        let i = 0;
        for (const command of commands) {
            embed.addField(i, command[0], true)
            i++;
            if (i == commands.size) {
                msg.channel.send(embed);
            }
        }


    },
};