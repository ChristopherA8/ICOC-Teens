module.exports = {
    name: "addfilter",
    execute(msg) {

        var word = require(`../../bannedWords.json`);

        var input = msg.content.substr(10).trim();

        word.words.push(input);

        msg.channel.send(`Word added to filter`);

    },
};