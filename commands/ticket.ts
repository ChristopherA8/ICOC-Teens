const Discord90 = require('discord.js');
module.exports = {
    name: "ticket",
    execute(msg) {
        const channel = msg.client.channels.cache.find(channel => channel.name === `staff-chat`);
        var ticket = msg.content.substr(7);

        if (ticket == "") {
            msg.channel.send(`**Error:** Invalid ticket!`);
        } else {
            const trimmedTicket = ticket.trim();
            //embed start
            const exampleEmbed = new Discord90.MessageEmbed()
            .setAuthor(`You've got Mail!`, `https://chr1s.dev/assets/mailbox.png`)
            .setColor('#00FF86')
            .setTitle('New Ticket -')
            .setFooter('')
            .setDescription(`"${trimmedTicket}"\n\n**From -** ${msg.author}`)
            channel.send(exampleEmbed);
            //embed end

        }

    },
};