module.exports = {
    async voice(msg, prefix) {

        if (msg.channel.type === 'dm') return;
        const Discord = require('discord.js');
        let command = msg.content.substr(prefix.length);
        const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;


        //////////////////////////////////////////////////
        // Voice commands
        //////////////////////////////////////////////////

        if (msg.content.startsWith(`${prefix}playskip`)) {
            await msg.client.distube.playSkip(msg, msg.content.substr(prefix.length + 8))
            return;
        }

        if (msg.content.startsWith(`${prefix}play`)) {
            msg.client.distube.play(msg, msg.content.substr(prefix.length + 4))
        }


        if (msg.content.startsWith(`${prefix}pause`)) {
            msg.client.distube.pause(msg)
        }

        // Not working for some reason (Maybe resume is outdated, and replaced by a different command idk lookup distube to see how to fix this)
        // if (msg.content.startsWith(`${prefix}resume`)) {
        //     if (msg.client.nowPlaying == undefined) {
        //         msg.channel.send(`No song to resume!`);
        //         return;
        //     }
        //     msg.client.distube.resume(msg)
        //     msg.channel.send("Resuming Music");
        // }

        if (msg.content.startsWith(`${prefix}shuffle`)) {
            msg.client.distube.shuffle(msg)
            msg.channel.send(`Shuffled queue!`);
        }

        if (msg.content.startsWith(`${prefix}volume`)) {
            if (Number.isNaN(Number(msg.content.substr(prefix.length + 6)))) {
                msg.channel.send(`**Error:** Invalid volume!`);
                return;
            }
            msg.client.distube.setVolume(msg, Number(msg.content.substr(prefix.length + 6)));
            msg.channel.send(`Volume: ${Number(msg.content.substr(prefix.length + 6))}%`);
        }

        if (msg.content.startsWith(`${prefix}stop`)) {
            msg.client.distube.stop(msg);
            msg.channel.send("Stopped the music!");
        }

        if (msg.content.startsWith(`${prefix}skip`)) {
            msg.client.distube.skip(msg);
            msg.channel.send("Song skipped!");
        }

        if (msg.content.startsWith(`${prefix}queue`)) {
            let queue = msg.client.distube.getQueue(msg);
            if (queue == undefined) {
                msg.channel.send(`No songs in queue!`);
                return;
            }
            msg.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `${id + 1}. ${song.name} - ${song.formattedDuration}`
            ).slice(0, 10).join("\n"), { code: "json" });
        }

        if (msg.content.startsWith(`${prefix}np`) || msg.content.startsWith(`${prefix}nowplaying`)) {
            let song = msg.client.nowPlaying;
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Now Playing:`)
            .setColor('#00FF86')
            .setThumbnail(`${song.thumbnail ? song.thumbnail : ''}`)
            .setDescription(`\n**${song.name}**\nDuration: ${song.formattedDuration}\nRequested by: ${song.user}\n${status(msg.client.distube.getQueue(msg))}`);
            if (msg.client.nowPlaying == undefined) {
                msg.channel.send(`No song found!`);
                return;
            }
            msg.channel.send(embed);
        }

        if (msg.content.startsWith(`${prefix}download`)) {
            let song = msg.client.nowPlaying;
            if (msg.client.nowPlaying == undefined) {
                msg.channel.send(`No song found!`);
                return;
            }
            msg.channel.send(`**Song Download Link:** ${song.streamURL}`);
        }

        if (msg.content.startsWith(`${prefix}loop`)) {
            msg.client.distube.setRepeatMode(msg, parseInt(msg.content.substr(prefix.length + 4)));
            switch (parseInt(msg.content.substr(prefix.length + 4))) {
                case 0:
                    msg.channel.send(`Looping: off`);
                    break;
                case 1:
                    msg.channel.send(`Looping: this song`);
                    break;
                case 2:
                    msg.channel.send(`Looping: entire queue`);
                    break;
                default:
                    msg.channel.send(`**Error:** Missing Parameter \`(0: disabled, 1: Repeat a song, 2: Repeat all the queue)\``);
                    break;
            }
        }

        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
            let filter = msg.client.distube.setFilter(msg, command);
            msg.channel.send("Current queue filter: " + (filter || "Off"));
        }





        //////////////////////////////////////
        // OLD VOICE COMMAND SUCKED LOLOL
        //////////////////////////////////////

        /*
        const ytdl = require('ytdl-core-discord');
        const { YTSearcher } = require('ytsearcher');
        const searcher = new YTSearcher('AIzaSyALqowrUUelRZOyrjC_NzdLUTnsW9PNj5k');
        var usrInput = msg.content.substr(5).trim();
        var fxInput = msg.content.substr(3).trim();

        //!play <search>
        if (msg.content.startsWith(`${prefix}play`)) {
        if (msg.channel.type === 'dm') return;

        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**Error:** Please join a voice channel first!`);
        }


        if (usrInput === "") {
            msg.channel.send(`**Error:** Song name empty!`); 
        } else {
            voiceChannel.join().then(async connection => {

            // try {
            //   let result = await searcher.search(usrInput).catch(error => console.log(error));
            //   const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' }, {highWaterMark: 1024 * 1024 * 10});
            //   msg.channel.send(`> **Now Playing:** ${result.first.url}`);
            //   dispatcher.on('finish', () => voiceChannel.leave());
            // } catch {
            //   msg.channel.send(`**Error:** An error occured, pls try again!`);
            // }

            let result = await searcher.search(usrInput).catch(error => console.log(error));
            const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' }, {highWaterMark: 1024 * 1024 * 10});

            // const embed = new Discord.MessageEmbed()
            // .setAuthor(`Now Playing:`)
            // .setDescription(`${result.first.url}`);
            // msg.channel.send(embed);
            msg.channel.send(result.first.url);

            dispatcher.on('finish', () => voiceChannel.leave());

            });
        }
        }

        //!stop
        if (msg.content.startsWith(`${prefix}stop`)) {
        if (msg.channel.type === 'dm') return;

        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**Error:** Please join a voice channel first!`);
        }

        voiceChannel.leave();
        } */

        var usrInput = msg.content.substr(5).trim();
        var fxInput = msg.content.substr(3).trim();

        //!bitrate
        if (msg.content.startsWith(`${prefix}bitrate`)) {
        if (msg.channel.type === 'dm') return;

        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**Error:** Please join a voice channel first!`);
        }

        msg.channel.send(`**Channel Bitrate: **${voiceChannel.bitrate}bps`);
        }


        //!fx
        if (msg.content.startsWith(`${prefix}fx`)) {
        if (msg.channel.type === 'dm') return;

        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.reply(`**Error:** Please join a msg channel first!`);
        }


        if (fxInput === "") {
            msg.channel.send(`**Error:** missing fx name!\nCheck #chat pins for list of fx`); 
        } else if(fxInput == `rickroll`) {
            msg.channel.send(`https://tenor.com/view/rickroll-dance-funny-you-music-gif-7755460`);
            voiceChannel.join().then(async connection => {
            const dispatcher = connection.play(`./sounds/${fxInput}.mp3`);
            dispatcher.on('finish', () => voiceChannel.leave());
            });
        } else if(fxInput == `ayesir`) {
            msg.channel.send(`https://tenor.com/view/fairytail-cat-aye-yes-excited-gif-4531180`);
            voiceChannel.join().then(async connection => {
            const dispatcher = connection.play(`./sounds/${fxInput}.mp3`);
            dispatcher.on('finish', () => voiceChannel.leave());
            });
        } else if(fxInput == `johncena`) {
            voiceChannel.join().then(async connection => {
            const dispatcher = connection.play(`./sounds/${fxInput}.mp3`);
            dispatcher.setVolume(20);
            dispatcher.on('finish', () => { 
                dispatcher.setVolume(1);
                voiceChannel.leave();
            });
            });
        } else {
        voiceChannel.join().then(async connection => {
            const dispatcher = connection.play(`./sounds/${fxInput}.mp3`);
            dispatcher.setVolume(3);
            dispatcher.on('finish', () => {
            dispatcher.setVolume(1);
            voiceChannel.leave()
            });
        });
        }
        }

        // THIS IS REALLY INTERESTING
        /* //!record
        if (msg.content.startsWith(`${prefix}record`)) {
        if (msg.channel.type === 'dm') return;

        const voiceChannel = msg.member.voice.channel;
        voiceChannel.join().then(async connection => {
            const fs = require('fs');
                // Create a ReadableStream of s16le PCM audio
            // const audio = connection.receiver.createStream(user, { mode: 'pcm', end: 'manual' });
            // const audio = connection.receiver.createStream(connection, { mode: 'pcm', end: 'manual' });
            // audio.pipe(fs.createWriteStream('./audio'));
        });

        } */









    

    },
}