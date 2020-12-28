module.exports = {
    name:"test",
    execute(msg) {

        // msg.channel.send(`\`\`\`json\n${JSON.stringify(msg.client.commands)}\`\`\``)
        // msg.client.emit('guildMemberRemove', msg.author);
        // msg.client.emit(`typingStart`, );
        // msg.client.emit(`guildMemberWarned`);
        // msg.client.emit(`ready`);
        // var justin = msg.guild.members.cache.get('279032930926592000');
        // msg.client.emit(`guildMemberAdd`, justin);
        // var channel = msg.guild.channels.cache.get('698590629344575503');
        // msg.client.emit(`channelDelete`, channel)

        // msg.content = "ur mom";
        // msg.client.emit("message", msg)
        // msg.guild.channels.create("this's", { type: 'text' });
        // msg.guild.features;
        var position = 0;
        const Discord542 = require('discord.js');
        var block = [
            ":left_right_arrow::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:",
            ":heavy_minus_sign::left_right_arrow::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:",
            ":heavy_minus_sign::heavy_minus_sign::left_right_arrow::heavy_minus_sign::heavy_minus_sign:",
            ":heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::left_right_arrow::heavy_minus_sign:",
            ":heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::left_right_arrow:"
        ]
        const embed = new Discord542.MessageEmbed()
        .setAuthor(`Left or Right?`)
        .setColor('#00FF86')
        .setDescription(`${block[position]}`);
        msg.channel.send(embed)
        .then(async msg => {
            await msg.react('◀')
            await msg.react('▶')
            const left = (reaction, user) => {
                return reaction.emoji.name === '◀';
            };
            const right = (reaction, user) => {
                return reaction.emoji.name === '▶';
            };
            const leftCollector = msg.createReactionCollector(left, { time: 100000 });
            leftCollector.on('collect', async (reaction, user) => {
                if (position == 0) {

                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                } else {

                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                    position -= 1;
                    embed.setDescription(`${block[position]}`);
                    msg.edit(embed)
                }
            });
            leftCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF left reaction collector
            const rightCollector = msg.createReactionCollector(right, { time: 100000 });
            rightCollector.on('collect', async (reaction, user) => {
                if (position == 4) {

                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                } else {

                    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(user.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }

                    position += 1;
                    embed.setDescription(`${block[position]}`);
                    msg.edit(embed)
                }
            });
            rightCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF right reaction collector

        });

    },
};