module.exports = {
    feedbackListener: function (msg) {

        if (msg.channel.id !== `803446581222309888`) return;
        msg.delete();

        let suggestions = msg.guild.channels.cache.get(`803323220853915679`);
        let time = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Suggestion`, `https://chr1s.dev/assets/mailbox.png`)
            .setColor(Math.floor(Math.random()*16777215).toString(16))
            .setDescription(`${msg}`)
            .setFooter(`From: ${msg.author.tag}  |  Time: ${time}`);
        suggestions.send(embed)
            .then(message => {
                message.react(`✅`)
                message.react(`❌`)
                message.react(`❔`)
                message.react(`<:uhh:761257817562415164>`)
            });

    }
};