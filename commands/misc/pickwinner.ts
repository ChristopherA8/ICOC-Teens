module.exports = {
    name:"pickwinner",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }

        const fs = require('fs');

        let data = fs.readFileSync(`./commands/json/giveaway.json`);
        var object = JSON.parse(data);
        var entries = object.entries;

        var lucky = getRandomInt(0, entries.length);
        var winner = entries[lucky];

        msg.channel.send(`**${winner.name}** won the giveaway!`);

    },
};