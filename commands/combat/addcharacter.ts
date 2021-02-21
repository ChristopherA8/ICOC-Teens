module.exports = {
    name:"addcharacter",
    async execute(msg) {

        const fs = require('fs');

        // Get characters from file
        let jsonData = fs.readFileSync(`./commands/combat/characters.json`);
        var charactersObject = JSON.parse(jsonData);

        if (charactersObject.characters.find(char => char.id == msg.author.id)) {
            msg.reply(`Character already exists!`);
            return;
        }

        var age;
        var name;
        var style;

        const filter = m => m.author.id == msg.author.id;
        await msg.channel.send(`Please enter name:`);
        const nameCollector = msg.channel.createMessageCollector(filter, { time: 15000 });

        var success = false;
        nameCollector.on('collect', m => {
            console.log(`Collected "${m.content}"`);
            name = m.content.trim();
            success = true;
            msg.client.emit(`askAge`);
            nameCollector.stop();
        });

        nameCollector.on('end', collected => {
            console.log(`done`);
            if (success) return;
            msg.reply(`Time ran out, please try again.`);
            console.log(`Name: "${name}"`);
        });

        msg.client.on(`askAge`, async () => {
            await msg.channel.send(`Please enter age:`);
            const ageCollector = msg.channel.createMessageCollector(filter, { time: 15000 });
    
            var ageSuccess = false;
            ageCollector.on('collect', m => {
                console.log(`Collected "${m.content}"`);
                age = m.content.trim();
                ageSuccess = true;
                ageCollector.stop();
                msg.client.emit(`askClass`);
            });
    
            ageCollector.on('end', collected => {
                console.log(`done`);
                if (ageSuccess) return;
                msg.reply(`Time ran out, please try again.`);
                console.log(`Age: "${age}"`);
            });
        }); // askAge

        msg.client.on(`askClass`, async () => {
            await msg.channel.send(`Please choose class(1,2,3):\n[ Rogue | Assassin | Bard ]`);
            const classCollector = msg.channel.createMessageCollector(filter, { time: 15000 });
    
            var classSuccess = false;
            classCollector.on('collect', m => {
                console.log(`Collected "${m.content}"`);
                style = m.content.trim();
                switch (style) {
                    case "1":
                        style = "Rogue";
                        break;
                    case "2":
                        style = "Assassin";
                        break;
                    case "3":
                        style = "Bard";
                        break;
                    default:
                        style = undefined;
                        break;
                }
                if (style !== undefined) {
                    classCollector.stop();
                } else {
                    msg.channel.send(`**Error:** Invalid option. Please enter 1, 2 or 3!`);
                }
                classSuccess = true;

                var newCharacter = {
                    id: msg.author.id,
                    name: name,
                    health: 100,
                    age: age,
                    style: style
                }

                // msg.channel.send(JSON.stringify(newCharacter, null, 4));
                charactersObject.characters.push(newCharacter);
                fs.writeFileSync(`./commands/combat/characters.json`, JSON.stringify(charactersObject, null, 4));

            });
    
            classCollector.on('end', collected => {
                console.log(`done`);
                if (classSuccess) return;
                msg.reply(`Time ran out, please try again.`);
                console.log(`Age: "${age}"`);
            });
        }); // askClass

    },
};