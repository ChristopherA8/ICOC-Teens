/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/*                                                                                                                             */
/*     ICOC Teens bot! A multipurpose chat bot for Discord. Features include, moderation, sound effects, XP/Leveling, etc...   */
/*                                      Written completely in TypeScript and json!                                             */
/*                                                  Invite Link                                                                */
/*              https://discord.com/api/oauth2/authorize?client_id=761792910088994816&permissions=8&scope=bot                  */
/*                                                                                                                             */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

// Constants
const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.json');
const { prefix, token, webhookURL } = require('./config.json');
const SQLite = require('better-sqlite3');
const client = new Discord.Client()
var colors = require('colors');
const sql = new SQLite('./databases/scores.sqlite');

// Custom Modules
const { logging } = require('./modules/logging.ts');
const { commands } = require('./modules/commandHandler.ts');
const { webserver } = require('./modules/webserver.ts');
const { welcome } = require('./modules/welcome.ts');
logging(client); // Start logging
commands(client); // Add command files to collection
webserver(client); // Web Server for literally no reason
welcome(client); // Welcome new members

// Runs on ready
client.on('ready', async () => {

  console.log('Connected as ' + `${client.user.tag}`.rainbow);
  let guild = await client.guilds.cache.get('698590629344575500');
  client.user.setActivity(`${guild.members.cache.size} members`, {type: "WATCHING"})

  // Check if the table "points" exists.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, name TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, name) VALUES (@id, @user, @guild, @points, @level, @name);");

});


client.on('message', msg => {

  // KEEP SPAM OUT OF #RULES
  if ((msg.channel.id == `770730379077353494`) && (!msg.content.startsWith(`${prefix}accept`))) {
    msg.delete();
    return;
  }

  if (msg.channel.type === 'dm') return;
  if (msg.author.bot) return;

  const { listen } = require('./modules/messageListener.ts');
  const { shopMemberWatcher } = require('./modules/shopMemberWatcher.ts');
  const { xpListener } = require('./modules/score.ts');
  const { filter } = require('./modules/wordfilter.ts');
  listen(msg);
  shopMemberWatcher(msg);
  xpListener(msg, client);
  filter(msg, fs, Discord);

  if ((((msg.channel.id !== `776264945800052746`)) && (msg.content.includes(`!xp`)))) {
    var botCommandsChannel = msg.guild.channels.cache.get(`776264945800052746`);
    msg.reply(`Use that in ${botCommandsChannel}`);
    return;
  }

  if (((msg.channel.id !== `776264945800052746`)) && (msg.content.includes(`!top`))) {
    var botCommandsChannel = msg.guild.channels.cache.get(`776264945800052746`);
    msg.reply(`Use that in ${botCommandsChannel}`);
    return;
  }

  // ......self explanatory
  if ((msg.content.match(/\bsimp\b/ig))) {
      msg.channel.send(`Therefore, my dear friends, flee from idolatry. - 1 Corinthians 10:14`);
  }
  if (msg.content.includes(`ur mom`) || (msg.content.includes(`your mom`))) {
    msg.channel.send(`airhorn airhorn airhorn`);
  }

  ///////////////////////////////////
  // Command Handler
  ///////////////////////////////////
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
  	return msg.channel.send(`\**Error:\** You didn't provide any arguments, ${msg.author}!`);
  }

  try {
    if (msg.content.startsWith(`${prefix}clear`)) {
      command.execute(msg, args);
    } else if(msg.content.startsWith(`${prefix}teens`)) {
      command.execute(msg, args);
    } else if(msg.content.startsWith(`${prefix}ticket`)) {
      command.execute(msg, args);
    } else if(msg.content.startsWith(`${prefix}eval`)) {
      command.execute(msg, args);
    } else {
      // setTimeout(() => {
      //   msg.delete();
      // }, 3000);
      command.execute(msg, args);
    }
  } catch (error) {
    console.error(error);
    msg.reply(`\**Crashlog:\** ${error}`);
  }

});


client.on('message', async voice => {

//////////////////////////////////////////////////
//Voice commands
//////////////////////////////////////////////////

const fs = require('fs');
const ytdl = require('ytdl-core-discord');
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher('AIzaSyALqowrUUelRZOyrjC_NzdLUTnsW9PNj5k');
var usrInput = voice.content.substr(5).trim();
var fxInput = voice.content.substr(3).trim();

//!play <search>
if (voice.content.startsWith(`${prefix}play`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply(`**Error:** Please join a voice channel first!`);
  }


  if (usrInput === "") {
    voice.channel.send(`**Error:** Song name empty!`); 
  } else {
    voiceChannel.join().then(async connection => {

      // try {
      //   let result = await searcher.search(usrInput).catch(error => console.log(error));
      //   const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' }, {highWaterMark: 1024 * 1024 * 10});
      //   voice.channel.send(`> **Now Playing:** ${result.first.url}`);
      //   dispatcher.on('finish', () => voiceChannel.leave());
      // } catch {
      //   voice.channel.send(`**Error:** An error occured, pls try again!`);
      // }

      let result = await searcher.search(usrInput).catch(error => console.log(error));
      const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' }, {highWaterMark: 1024 * 1024 * 10});
      voice.channel.send(`> **Now Playing:** ${result.first.url}`);
      dispatcher.on('finish', () => voiceChannel.leave());

    });
  }
}

//!stop
if (voice.content.startsWith(`${prefix}stop`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply(`**Error:** Please join a voice channel first!`);
  }

  voiceChannel.leave();
}

//!bitrate
if (voice.content.startsWith(`${prefix}bitrate`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply(`**Error:** Please join a voice channel first!`);
  }

  voice.channel.send(`**Channel Bitrate: **${voiceChannel.bitrate}bps`);
}


//!fx
if (voice.content.startsWith(`${prefix}fx`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply(`**Error:** Please join a voice channel first!`);
  }


  if (fxInput === "") {
    voice.channel.send(`**Error:** missing fx name!\nCheck #chat pins for list of fx`); 
  } else if(fxInput == `rickroll`) {
    voice.channel.send(`https://tenor.com/view/rickroll-dance-funny-you-music-gif-7755460`);
    voiceChannel.join().then(async connection => {
      const dispatcher = connection.play(`./sounds/${fxInput}.mp3`);
      dispatcher.on('finish', () => voiceChannel.leave());
    });
  } else if(fxInput == `ayesir`) {
    voice.channel.send(`https://tenor.com/view/fairytail-cat-aye-yes-excited-gif-4531180`);
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

/* //!bitrate
if (voice.content.startsWith(`${prefix}record`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;
  voiceChannel.join().then(async connection => {
    const fs = require('fs');
        // Create a ReadableStream of s16le PCM audio
    // const audio = connection.receiver.createStream(user, { mode: 'pcm', end: 'manual' });
    // const audio = connection.receiver.createStream(connection, { mode: 'pcm', end: 'manual' });
    // audio.pipe(fs.createWriteStream('./audio'));
  });

} */

});



  /* =-=-=-=-=-=-=-=-=-= Slash Commands!! =-=-=-=-=-=-=-=-=-= */

  const discordJsHandlers = require('./node_modules/discord.js/src/client/websocket/handlers/index');
  var commandName;
  var channelID;
  var guildID;
  discordJsHandlers.INTERACTION_CREATE = (_client, { d: packetData }) => {
    commandName = packetData.data.name;
    channelID = packetData.channel_id;
    guildID = packetData.guild_id;
    if (commandName == 'frogge') {
      frogge(guildID, channelID);
    } else if (commandName == 'bear') {
      bear(guildID, channelID);
    }
  };

  function frogge(guildID, channelID) {
    var guild = client.guilds.cache.find(guild => guild.id == guildID)
    var channel = guild.channels.cache.get(channelID)
    let { giphy } = require(`./config.json`);
    let fetch = require(`node-fetch`);
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphy}&tag=frog&rating=g`)
    .then(res => res.json())
    .then(api => {
        channel.send(api.data.url)
    })
  }

  function bear(guildID, channelID) {
    var guild = client.guilds.cache.find(guild => guild.id == guildID)
    var channel = guild.channels.cache.get(channelID)
    var { tenor } = require(`./config.json`);
    var fetch = require(`node-fetch`);
    fetch(`https://api.tenor.com/v1/random?key=${tenor}&q=cute%20bears&locale=en_US&contentfilter=medium&limit=1`)
    .then(res => res.json())
    .then(api => {
        channel.send(api.results[0].url)
    })
  }

  /* =-=-=-=-=-=-=-=-=-= END OF Slash Commands!! =-=-=-=-=-=-=-=-=-= */



client.login(token)

