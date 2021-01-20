module.exports = {
    voiceEvents(client) {

        const Discord = require(`discord.js`);

        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

        client.distube.on("playSong", (message, queue, song) => {
            client.nowPlaying = song;

            const embed = new Discord.MessageEmbed()
            .setAuthor(`Now Playing:`)
            .setColor('#00FF86')
            .setThumbnail(`${song.thumbnail ? song.thumbnail : ''}`)
            .setDescription(`\n**${song.name}**\nDuration: ${song.formattedDuration}\nRequested by: ${song.user}\n${status(queue)}`);

            message.channel.send(embed);

        })
        .on("addSong", (message, queue, song) => {
            
            message.channel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        
        })
        .on("playList", (message, queue, playlist, song) => {
            
            message.channel.send(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)

        })
        .on("addList", (message, queue, playlist) => {
            
            message.channel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        
        })
        // DisTubeOptions.searchSongs = true
        .on("searchResult", (message, result) => {
            let i = 0;
            message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        })
        // DisTubeOptions.searchSongs = true
        .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
        .on("error", (message, e) => {
            console.error(e)
            message.channel.send("An error encountered: " + e);
        });

    },
};