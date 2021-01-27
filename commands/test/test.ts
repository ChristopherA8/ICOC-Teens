module.exports = {
    name:"test",
    async execute(msg) {

        // msg.channel.send(`\`\`\`json\n${JSON.stringify(msg.client.commands)}\`\`\``)
        // var member = msg.guild.members.cache.get('0');
        // msg.client.emit('guildMemberRemove', member);
        // msg.client.emit(`typingStart`, );
        // msg.client.emit(`guildMemberWarned`);
        // msg.client.emit(`ready`);
        // var justin = msg.guild.members.cache.get('279032930926592000');
        // msg.client.emit(`guildMemberAdd`, justin);
        // var channel = msg.guild.channels.cache.get('698590629344575503');
        // msg.client.emit(`channelDelete`, channel)

        // const Discord = require('discord.js');
        // var newMember = new Discord.GuildMember(msg.client, msg.member, msg.guild);

        // msg.channel.send(JSON.stringify(msg.member, null, 4), { code: "json", split: true });

        // const filter = (reaction, user) => user.id == msg.author.id;
        // msg.awaitReactions(filter, { time: 15000 })
        // .then(collected => console.log(`Collected ${collected.size} reactions`))
        // .catch(console.error);

/*         await msg.react(`👀`);

        const filter = (reaction, user) => user.id == msg.author.id;
        const collector = msg.createReactionCollector(filter);
        collector.on('collect', async (r, user) => {
            msg.channel.send(`Collected ${r.emoji.name}`);
            msg.channel.send(JSON.stringify(r, null, 2), { code: "json" });

            // const message = await msg.channel.messages.fetch(msg.id);
            r.users.remove(user.id);
            // msg.reactions.resolve(r).users.remove(r.users[0]);
            // msg.react(`👀`);
            // msg.reactions.resolve("REACTION EMOJI, REACTION OBJECT OR REACTION ID").users.remove("ID OR OBJECT OF USER TO REMOVE");

        }); */

        // msg.content = "ur mom";
        // msg.client.emit("message", msg)
        // msg.guild.channels.create("this's", { type: 'text' });
        // msg.guild.features;
/*         var position = 0;
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

        }); */

        const { isToday } = require('../../helper_functions/isToday.ts');
        let rightNow = new Date(`${msg.content.substr(5)}`)
        const today = isToday(rightNow)
        if (today) {
            msg.channel.send(`it's today`)
        } else {
            msg.channel.send(`it's not today`)
        }

    },
};