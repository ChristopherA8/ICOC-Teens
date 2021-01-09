module.exports = {
    name:"weeb",
    execute(msg) {

        msg.delete();

        if (msg.author.id !== `279032930926592000`) return;

        var times = 0;

        const discord = require('discord.js');
        const embed = new discord.MessageEmbed()
        .setAuthor(`react to this`)
        .setDescription(`maybe something will happen`);
        msg.channel.send(embed)
        .then(async msg => {

            await msg.react('🎉');
            const giveawayFilter = (reaction, user) => {
                return reaction.emoji.name === '🎉';
            };
            const giveawayCollector = msg.createReactionCollector(giveawayFilter);
            giveawayCollector.on('collect', async (r, user) => {
                var reactionMember = msg.guild.members.cache.get(user.id);

                switch (times) {
                    case 0:
                        await embed.setDescription(`or not :eyes:`);
                        times++;
                        break;
                    case 1:
                        await embed.setDescription(`there is a chance tho`);
                        times++;
                        break;
                    case 2:
                        await embed.setDescription(`....`);
                        times++;
                        break;
                    case 3:
                        await embed.setDescription(`why do you try so hard`);
                        times++;
                        break;
                    case 4:
                        await embed.setDescription(`im sorry`);
                        times++;
                        break;
                    case 5:
                        await embed.setDescription(`did I troll?`);
                        times++;
                        break;
                    case 6:
                        await embed.setDescription(`maybe`);
                        times++;
                        break;
                    case 7:
                        await embed.setDescription(`ok, this was just a joke\nnothing actually happens`);
                        times++;
                        break;
                    case 8:
                        await embed.setDescription(`unless :eyes:`);
                        times++;
                        break;
                    default:
                        break;
                }
                msg.edit(embed);

            });

        });

    },
};