const Discord65 = require('discord.js');
module.exports = {
    name: "poll",
    execute(msg) {

        //const pollEmbed = require('discord.js-poll-embed');
       


        msg.channel.send('Name: ').then(message => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, { max: 1, time: 5000, errors: ['time'] })
        .then(collected => msg.channel.send(`Name = "${collected.first()}"`))
        .catch(collected => message.delete());
        });

        var options = ['ice', 'party'];
        var timeout = 30;
        var emojiList = ['🧊', '🎉'];
        var forceEndPollEmoji = '✌';
        var title = `test`;
        //pollEmbed(msg, title, options, timeout, emojiList, forceEndPollEmoji);


    },
};