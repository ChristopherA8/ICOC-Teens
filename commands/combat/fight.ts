module.exports = {
    name:"fight",
    async execute(msg) {
        // https://tenor.com/view/no-the-office-steve-carrell-michael-scott-gif-4652931
        // https://tenor.com/view/stop-stop-it-gif-8738085
        msg.channel.send(`https://tenor.com/view/stop-stop-it-gif-8738085`);

        // const fs = require('fs');
        //
        // // Get characters from file
        // let jsonData = fs.readFileSync(`./commands/combat/characters.json`);
        // var charactersObject = JSON.parse(jsonData);
        //
        // // Get member's character from character array
        // var character = charactersObject.characters.filter(character => character.id == msg.author.id);
        // character = character[0];
        //
        // //Character properties
        // var name = character.name;
        // var health = character.health;
        // var age = character.age;
        // var style = character.class; // 'class' is not allowed as a variable declaration name
        //
        // function getRandomInt(min, max) {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);
        //     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        // }
        // var successNumber = getRandomInt(0,5);
        // console.log(successNumber);
        // var success = false;
        // if (successNumber > 2) {
        //     success = true;
        // }
        // var randomHealth = getRandomInt(5,20);
        //
        // function loseHealth(randomHealth) {
        //     if (health - randomHealth < 0) {
        //         character.health = 0;
        //         msg.channel.send(`${name} has died :skull_crossbones:`);
        //     } else {
        //         character.health -= randomHealth; // remove health
        //     }
        // }
        // function gainHealth(randomHealth) {
        //     if (health + randomHealth > 100) {
        //         character.health = 100;
        //     } else {
        //         character.health += randomHealth; // gain health
        //     }
        // }
        //
        // if (health == 0) {
        //     msg.channel.send(`${name} is dead :skull_crossbones:`);
        //     return;
        // }
        //
        // if (success) {
        //     msg.channel.send(`\`[ Fight Started ]\``)
        //     .then(msg => {
        //         setTimeout(() => {
        //             msg.edit(`\`\`\`md\nResults: ${name} defeated the enemy.\nHealed ${randomHealth}hp\`\`\``);
        //         }, 1000)
        //     });
        //     await gainHealth(randomHealth);
        // } else {
        //     msg.channel.send(`\`[ Fight Started ]\``)
        //     .then(msg => {
        //         setTimeout(() => {
        //             msg.edit(`\`\`\`md\nResults: ${name} was stabbed by goblin.\nLost ${randomHealth}hp\`\`\``);
        //         }, 1000)
        //     });
        //     await loseHealth(randomHealth);
        // }
        //
        //
        //
        // // Write new health to file
        // fs.writeFileSync(`./commands/combat/characters.json`, JSON.stringify(charactersObject, null, 4));


    },
};