module.exports = {
    name:"gacha",
    execute(msg) {

        // Constants
        const fs = require(`fs`);
        const embedDiscord = require('discord.js');

        /* =-=-=-= Functions =-=-=-= */
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
        /* =-=-=-=-=-=-=-=-=-=-=-=-= */

        // Items
        let itemsJson = fs.readFileSync(`./commands/gacha/items.json`);
        var itemsObject = JSON.parse(itemsJson);

        // Get random item
        var randomNumber = getRandomInt(0, itemsObject.items.length);
        var randomItem = itemsObject.items.filter(item => item.id == randomNumber);
        randomItem = randomItem[0];

        console.log(JSON.stringify(itemsObject.items.filter(item => item.id == randomNumber), null, 4));
        console.log(randomNumber);

        const embed = new embedDiscord.MessageEmbed()
        .setAuthor(randomItem.name)
        .setColor(`#FFDAB9`)
        .setImage(randomItem.url);
        msg.channel.send(embed);

    },
};