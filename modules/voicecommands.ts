module.exports = {
    async voice(msg, prefix) {

        if (msg.channel.type === 'dm') return;

/*         //////////////////////////////////////////////////
        //Voice commands
        //////////////////////////////////////////////////

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
        }

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