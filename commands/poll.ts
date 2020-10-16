const Discord65 = require('discord.js');
module.exports = {
    name: "poll",
    execute(msg) {

        /*
        const pollEmbed = require('discord.js-poll-embed');

        var input = msg.content.substr(5);
        if (input == "") {
            msg.channel.send(`**Error:** Missing input!`);
        } else {
            var inputTrim = input.trim(); // removes space at beginning and end of string
            var inputs = inputTrim.split('-');
            var name = inputs[0];
            var option1 = inputs[1];
            var option2 = inputs[2];
            var time = inputs[3];

            var options = [`${option1}`, `${option2}`];
            var timeout = `${time}`;
            var emojiList = ['1️⃣', '2️⃣'];
            var forceEndPollEmoji = '🛑';
            var title = `${name}`;
            pollEmbed(msg, title, options, timeout, emojiList, forceEndPollEmoji);
        }
        */
       const pollEmbed = require('discord.js-poll-embed');

       var input = msg.content.substr(5);
       if (input == "") {
           msg.channel.send(`**Error:** Missing input!`);
       } else {
           var inputTrim = input.trim(); // removes space at beginning and end of string
           var inputs = inputTrim.split('-');
           var name = inputs[0];
           var option1 = inputs[1];
           var option2 = inputs[2];
           var option3 = inputs[3];
           var time = inputs[4];

           var options = [`${option1}`, `${option2}`, `${option3}`];
           var timeout = `${time}`;
           var emojiList = ['1️⃣', '2️⃣', '3️⃣'];
           var forceEndPollEmoji = '🛑';
           var title = `${name}`;
           pollEmbed(msg, title, options, timeout, emojiList, forceEndPollEmoji);
       }




    },
};