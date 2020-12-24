module.exports = {
	name: 'help',
	execute(msg) {

        const Discord2 = require('discord.js');

        function millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            let seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
            }
            
        var uptime = millisToMinutesAndSeconds(msg.client.uptime);


        var embedArr = {
            titles: [
                { name: `Information:` },
                { name: `Moderation:` },
                { name: `Music:` },
                { name: `Misc:` },
                { name: `XP/Leveling:` },
                { name: `=-=-=-= Portal Activated =-=-=-=` }
            ],
            fields: [
                [
                    { name: '\`!help\`', value: `lists all commands`, inline: true},
                    { name: `\`!about\``, value: `About the bot ._.`, inline: true},
                    { name: '\`!bible <book> <chapter> <verse> [through verse2]\`', value: `fetch verse`, inline: true},
                    { name: '\`!icon\`', value: `get server icon`, inline: true},
                    { name: '\`!pfp [@user]\`', value: `get user profile picture`, inline: true},
                    { name: '\`!serverinfo\`', value: `get server info`, inline: true},
                    { name: '\`!userinfo\`', value: `get user info`, inline: true},
                    { name: '\`!roles\`', value: `lists all server roles`, inline: true},
                    { name: '\`!uptime\`', value: `show bot uptime in minutes and seconds`, inline: true},
                    { name: '\`!online\`', value: `See how many people are online`, inline: true}
                ],
                [
                    { name: '\`!ban <@user> [reason]\`', value: `ban user`, inline: true},
                    { name: `\`!kick <@user> [reason]\``, value: `kick user`, inline: true},
                    { name: '\`!clear <1-99>\`', value: `delete messages`, inline: true},
                    { name: '\`!lock [channel name]\`', value: `disable "send messages" in channel`, inline: true},
                    { name: '\`!unlock [channel name]\`', value: `enable "send messages" in channel`, inline: true},
                    { name: '\`!mute <@user> [reason]\`', value: `mute user`, inline: true},
                    { name: '\`!unmute <@user> [reason]\`', value: `unmute user`, inline: true},
                    { name: '\`!tempmute <@user> <time (don\'t make this rly big or it breaks)>\`', value: `tempmute user`, inline: true},
                    { name: '\`!ticket <message>\`', value: `send message to staff only channel`, inline: true},
                    { name: '\`!bans\`', value: `lists all banned users`, inline: true},
                    { name: `\`!checklist\``, value: `do "!checklist help"`, inline: true},
                    { name: '\`!warn <@user>\`', value: `warns user, 3 warns = 5 minute mute`, inline: true},
                    { name: '\`!clearwarns\`', value: `clears warns for user`, inline: true},
                    { name: '\`!warns <@user>\`', value: `list warn count for user`, inline: true}    
                ],
                [
                    { name: '\`!play <song name>\`', value: `plays song from youtube`, inline: true},
                    { name: `\`!stop\``, value: `stops song`, inline: true},
                    { name: '\`!bitrate\`', value: `fetches bitrate of channel`, inline: true},
                    { name: '\`!fx <name>\`', value: `available fx: airhorn, ayesir, chottomate, easy, heyaha, hourslater, illuminati, johncena, ohh, oof, replay, ricknmorty, rickroll, wow, yeet, longoof, megaoof, zawarudo, nice, gucci, letsgo, ~~ussr~~`, inline: true}
                ],
                [
                    { name: `\`!off\``, value: `shutdown bot, limited to "Engineer" role`, inline: true},
                    { name: `\`!annoy\``, value: `repeats what you say for 10 seconds`, inline: true},
                    { name: `\`!trivia\``, value: `fetches a random true/false question`, inline: true},
                    { name: `\`!status <status>\``, value: `changes status of bot`, inline: true},
                    { name: `\`!rhyme <word>\``, value: `finds words that rhyme`, inline: true},
                    { name: '\`!poll <title>-<option1>-<option2>-<time in seconds>\`', value: `example; !poll dog or cat-dog-cat-30`, inline: true},
                    { name: `\`!flip\``, value: `flip a coin`, inline: true},
                    { name: `\`!wiki <search>\``, value: `Search wikipedia`, inline: true},
                    { name: `\`!8ball\``, value: `basically just 8ball`, inline: true},
                    { name: `\`!type <start/stop>\``, value: `Bot typing indicator`, inline: true},
                    { name: `\`!convert <new file type> add attachment\``, value: `converts files POG`, inline: true}
                ],
                [
                    { name: `\`!xp or !rank\``, value: `View xp and level`, inline: false},
                    { name: `\`!lvlup\``, value: `For the elite and upperclass of society`, inline: false},
                    { name: `\`!resetxp\``, value: `resets xp`, inline: true},
                    { name: `\`!resetlvl\``, value: `resets lvl`, inline: true},
                    { name: `\`!top or !lead\``, value: `Shows Leaderboard (top 10)`, inline: true}
                ]
            ]
        };

        var page = 1;
        var fieldPage = embedArr.fields[page - 1]
        const embed = new Discord2.MessageEmbed()
        .setAuthor(`!help`, ``)
        .setColor('#00FF86')
        .setTitle(`${embedArr.titles[page - 1].name}`)
        .setFooter(`Page: ${page}/5  |  Uptime: ${uptime}`);
        for (const field of fieldPage) {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline })
        }
        msg.channel.send(embed)
        .then(async msg => {
            await msg.react('⏪')
            await msg.react('◀')
            await msg.react('▶')
            await msg.react('⏩')
            const left = (reaction, user) => {
                return reaction.emoji.name === '◀';
            };
            const right = (reaction, user) => {
                return reaction.emoji.name === '▶';
            };
            const first = (reaction, user) => {
                return reaction.emoji.name === '⏪';
            };
            const last = (reaction, user) => {
                return reaction.emoji.name === '⏩';
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

                    page -= 1;
                    fieldPage = embedArr.fields[page - 1];
                    embed.setTitle(`${embedArr.titles[page - 1].name}`);
                    embed.setFooter(`Page: ${page}/5  |  Uptime: ${uptime}`);
                    embed.fields = [];
                    for (const field of fieldPage) {
                        embed.addFields({ name: field.name, value: field.value, inline: field.inline })
                    }
                    msg.edit(embed)
                }
            });
            leftCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF left reaction collector
            const rightCollector = msg.createReactionCollector(right, { time: 100000 });
            rightCollector.on('collect', async (reaction, user) => {
                if (page == 5) {

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

                    page += 1;
                    fieldPage = embedArr.fields[page - 1];
                    embed.setTitle(`${embedArr.titles[page - 1].name}`);
                    embed.setFooter(`Page: ${page}/5  |  Uptime: ${uptime}`);
                    embed.fields = [];
                    for (const field of fieldPage) {
                        embed.addFields({ name: field.name, value: field.value, inline: field.inline })
                    }
                    msg.edit(embed)
                }
            });
            rightCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF right reaction collector
            const firstCollector = msg.createReactionCollector(first, { time: 100000 });
            firstCollector.on('collect', async (reaction, user) => {
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

                    page = 1;
                    fieldPage = embedArr.fields[page - 1];
                    embed.setTitle(`${embedArr.titles[page - 1].name}`);
                    embed.setFooter(`Page: ${page}/5  |  Uptime: ${uptime}`);
                    embed.fields = [];
                    for (const field of fieldPage) {
                        embed.addFields({ name: field.name, value: field.value, inline: field.inline })
                    }
                    msg.edit(embed)
                }
            });
            firstCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF first reaction collector
            const lastCollector = msg.createReactionCollector(last, { time: 100000 });
            lastCollector.on('collect', async (reaction, user) => {
                if (page == 5) {

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

                    page = 5;
                    fieldPage = embedArr.fields[page - 1];
                    embed.setTitle(`${embedArr.titles[page - 1].name}`);
                    embed.setFooter(`Page: ${page}/5  |  Uptime: ${uptime}`);
                    embed.fields = [];
                    for (const field of fieldPage) {
                        embed.addFields({ name: field.name, value: field.value, inline: field.inline })
                    }
                    msg.edit(embed)
                }
            });
            lastCollector.on('end', collected => {
                msg.reactions.removeAll();
            }); // END OF last reaction collector

        }).catch(err => {console.error(err)}); // END OF .then()

	},
};