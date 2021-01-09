module.exports = {
    name:"giveaway",
    execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        const fs = require('fs');
        var input = msg.content.substr(9).trim();

        if (input === '') {
            msg.channel.send(`Please include giveaway item!`);
            return;
        };

        var newGiveaway = {
            entries: []
        }
        fs.writeFileSync(`./commands/json/giveaway.json`, JSON.stringify(newGiveaway, null, 4));

        const discord = require('discord.js');
        const embed = new discord.MessageEmbed()
        .setAuthor(`Giveaway!`)
        .setDescription(`Giveaway for: **${input}**\nReact to enter.`);
        msg.channel.send(embed)
        .then(async msg => {

            await msg.react('🎉');
            const giveawayFilter = (reaction, user) => {
                return reaction.emoji.name === '🎉';
            };
            const giveawayCollector = msg.createReactionCollector(giveawayFilter);
            giveawayCollector.on('collect', async (r, user) => {
                // r.users.remove(user.id);
                var reactionMember = msg.guild.members.cache.get(user.id);
                var newEntry = { name:`${reactionMember.user.username}` };
                let data = fs.readFileSync(`./commands/json/giveaway.json`);
                var object = JSON.parse(data);
                if (object.entries.find(mem => mem.name == reactionMember.user.username)) return;

                object.entries.push(newEntry);
                fs.writeFileSync(`./commands/json/giveaway.json`, JSON.stringify(object, null, 4));
            });

        });

    },
};