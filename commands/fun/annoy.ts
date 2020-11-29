const Discord64 = require('discord.js');
module.exports = {
    name: "annoy",
    execute(msg) {

        //const pollEmbed = require('discord.js-poll-embed');
        const collector = new Discord64.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
        
        collector.on('collect', message => {
            var name = message.content;
            msg.channel.send(`${name}`);
        })
        collector.on('end', end => {
            msg.channel.send(`I am done annoying you`);
        })

    },
};