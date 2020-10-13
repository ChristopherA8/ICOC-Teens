const Discord65 = require('discord.js');
module.exports = {
    name: "poll",
    execute(msg) {

        //const pollEmbed = require('discord.js-poll-embed');

        function askForName() {
            const askName = new Discord65.MessageCollector(msg.channel, m => m.author.id === msg.author.id);
            askName.on('collect', message => {
                msg.channel.send(`Poll name:`);
                var name = message.content;
                msg.channel.send(`Name: "${name}"`);
                askName.stop();
            })
        }

        function askForItem() {
            const askItem = new Discord65.MessageCollector(msg.channel, m => m.author.id === msg.author.id);
            askItem.on('collect', message => {
                msg.channel.send(`Item 1:`);
                var title = message.content;
                msg.channel.send(`Title: "${title}"`);
                askItem.stop();
            })
        }

        askForName();
        askForItem();

        var options = ['ice', 'party'];
        var timeout = 30;
        var emojiList = ['🧊', '🎉'];
        var forceEndPollEmoji = '✌';
        var title = `test`;
        //pollEmbed(msg, title, options, timeout, emojiList, forceEndPollEmoji);


    },
};