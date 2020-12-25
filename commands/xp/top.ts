module.exports = {
    name:"top",
    execute(msg) {

        // msg.channel.send(`Down for Maintenance`);

        const Discord6090 = require('discord.js');

        const SQLite = require('better-sqlite3');

        // Create SQLite database
        const sql = new SQLite('./databases/scores.sqlite');

        //msg.channel.send(`**Down for Maintenance**`);

        var page = 1;
        const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 80").all(msg.guild.id);
        const embed = new Discord6090.MessageEmbed()
        .setColor('#00FF86')
        .setDescription(`\`\`\`md\n${page}. ${top10[page - 1].name} | XP: ${top10[page - 1].points}\n${page + 1}. ${top10[page].name} | XP: ${top10[page].points}\n${page + 2}. ${top10[page + 1].name} | XP: ${top10[page + 1].points}\n${page + 3}. ${top10[page + 2].name} | XP: ${top10[page + 2].points}\n${page + 4}. ${top10[page + 3].name} | XP: ${top10[page + 3].points}\n${page + 5}. ${top10[page + 4].name} | XP: ${top10[page + 4].points}\n${page + 6}. ${top10[page + 5].name} | XP: ${top10[page + 5].points}\n${page + 7}. ${top10[page + 6].name} | XP: ${top10[page + 6].points}\n${page + 8}. ${top10[page + 7].name} | XP: ${top10[page + 7].points}\n${page + 9}. ${top10[page + 8].name} | XP: ${top10[page + 8].points}\n\`\`\``)
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
                if (page == 1) {

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

                    page -= 10;
                    embed.setDescription(`\`\`\`md\n${page}. ${top10[page - 1].name} | XP: ${top10[page - 1].points}\n${page + 1}. ${top10[page].name} | XP: ${top10[page].points}\n${page + 2}. ${top10[page + 1].name} | XP: ${top10[page + 1].points}\n${page + 3}. ${top10[page + 2].name} | XP: ${top10[page + 2].points}\n${page + 4}. ${top10[page + 3].name} | XP: ${top10[page + 3].points}\n${page + 5}. ${top10[page + 4].name} | XP: ${top10[page + 4].points}\n${page + 6}. ${top10[page + 5].name} | XP: ${top10[page + 5].points}\n${page + 7}. ${top10[page + 6].name} | XP: ${top10[page + 6].points}\n${page + 8}. ${top10[page + 7].name} | XP: ${top10[page + 7].points}\n${page + 9}. ${top10[page + 8].name} | XP: ${top10[page + 8].points}\n\`\`\``)
                    msg.edit(embed)
                }
            });
            leftCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF left reaction collector
            const rightCollector = msg.createReactionCollector(right, { time: 100000 });
            rightCollector.on('collect', async (reaction, user) => {
                if (page == 10) {

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

                    page += 10;
                    embed.setDescription(`\`\`\`md\n${page}. ${top10[page - 1].name} | XP: ${top10[page - 1].points}\n${page + 1}. ${top10[page].name} | XP: ${top10[page].points}\n${page + 2}. ${top10[page + 1].name} | XP: ${top10[page + 1].points}\n${page + 3}. ${top10[page + 2].name} | XP: ${top10[page + 2].points}\n${page + 4}. ${top10[page + 3].name} | XP: ${top10[page + 3].points}\n${page + 5}. ${top10[page + 4].name} | XP: ${top10[page + 4].points}\n${page + 6}. ${top10[page + 5].name} | XP: ${top10[page + 5].points}\n${page + 7}. ${top10[page + 6].name} | XP: ${top10[page + 6].points}\n${page + 8}. ${top10[page + 7].name} | XP: ${top10[page + 7].points}\n${page + 9}. ${top10[page + 8].name} | XP: ${top10[page + 8].points}\n\`\`\``)
                    msg.edit(embed)
                }
            });
            rightCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF right reaction collector
        }).catch(err => {console.error(err)}); // END OF .then()




    }
}