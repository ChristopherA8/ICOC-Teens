module.exports = {
    name:"character",
    execute(msg) {

        const Discord668 = require('discord.js');
        const fs = require('fs');

        // Get characters from file
        let jsonData = fs.readFileSync(`./commands/combat/characters.json`);
        var charactersObject = JSON.parse(jsonData);

        // Get member's character from character array
        var character = charactersObject.characters.filter(character => character.id == msg.author.id);
        character = character[0];

        if (character == undefined) {
            msg.channel.send(`Character does not exist! Use !addcharacter to start character creation!`);
            return;
        }

        //Character properties
        var name = character.name;
        var health = character.health;
        var age = character.age;
        var style = character.style; // 'class' is not allowed as a variable declaration name

        // Get embed color
        var color;
        switch (style) {
            case "Rogue":
                color = "#A51616"; // Blood Red
                break;
            case "Assassin":
                color = "#228B22"; // Forest Green
                break;
            case "Bard":
                color = "#228B22"; // Forest Green - please change this later
                break;
            default:
                color = "#808080";
                break;
        }

        var healthName;
        // Health
        if (health == 0) {
            healthName = 'Died';
        }

        // Info Embed
        const embed = new Discord668.MessageEmbed()
        .setAuthor(`Character: ${name}`)
        .setColor(color)
        .setDescription(`*Age:* **${age ? age : `No Age`}**  |  *Class:* **${style ? style : `No Class`}**\n\n*Health:* ***${healthName ? healthName : health + '%'}***`);
        msg.channel.send(embed);

    },
};