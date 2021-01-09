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

// Exports
// I just passed the client as an argument when executing the module functions
// module.exports.client = client; // Used for custom modules

// Create SQLite database
const sql = new SQLite('./databases/scores.sqlite');

// Custom Modules
const { logging } = require('./modules/logging.ts');
const { commands } = require('./modules/commandHandler.ts');
logging(client); // Start logging
commands(client); // Add command files to collection

// Runs on ready
client.on('ready', async () => {

  console.log('Connected as '.rainbow + `${client.user.tag}`.rainbow);
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

//Runs when a member joins a guild
client.on('guildMemberAdd', join => {

  if (join.guild.id !== `698590629344575500`) return;
  const channel = join.client.channels.cache.find(channel => channel.id == `698591277205422171`);
  channel.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>`);
  join.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>\n\nThanks for checking out the server. To join the server please fill out this form!\n\n<https://docs.google.com/forms/d/e/1FAIpQLSfatFjGGgYmdMjsPFZKM-KX8zEuWvlKi76KX8XNceGTbEiMlw/viewform>\nIf you have any issues/questions filling out the form, feel free to dm a staff member <:smileanime:790423498370580480>`);

});


client.on('message', msg => {

  // Keep bot from responding in DM's and to other bots
  if (msg.channel.type === 'dm') return;
  if (msg.author.bot) return;

  const { listen } = require('./modules/messageListener.ts');
  const { shopMemberWatcher } = require('./modules/shopMemberWatcher.ts');
  listen(msg);
  shopMemberWatcher(msg);

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

  //disable xp in #rules
    if (msg.channel.id !== `770730379077353494`) {
    if (msg.author.bot) return;
    let score;
    // score = client.getScore.get(msg.author.id, msg.guild.id);
    score = client.getScore.get(msg.author.id, "698590629344575500");

    if (!score) {
      score = { id: `${msg.guild.id}-${msg.author.id}`, user: msg.author.id, guild: msg.guild.id, points: 0, level: 1, name: msg.author.tag}
    }
    if (!score.name) {
      score.name = msg.author.tag;
    }
    function getXP() {
      var words = msg.content.split(" ");
      var wordCount = words.length;
      if (wordCount <= 25) {
        score.points += wordCount;
      } else {
        score.points += 25;
      }
      // score.points++;
      client.setScore.run(score);
    }
    // setTimeout(getXP, 6000);
    setTimeout(getXP, 6000);
    // getXP();

    const curLevel = Math.floor(0.3 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      msg.reply(`You've leveled up to level **${curLevel}**!`);
    }
    client.setScore.run(score);



  }//end of rules channel check

  // KEEP SPAM OUT OF #RULES
  if (msg.channel.id == `770730379077353494`) {
    msg.delete();
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


/* if (voice.content.startsWith(`${prefix}play`)) {
  voice.channel.send(`**Error:** Play has been temporarily/not so temporarily disabled while I squash some bugs :smile:`);
} */

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

//!bitrate
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

}

});



//////////////////////////////////
// Word Filter
//////////////////////////////////

client.on(`message`, nono => {
  if (nono.channel.id == `770730379077353494`) return;
  if (nono.author.bot) return;
  if (nono.channel.type === 'dm') return;

  const words = require(`./bannedWords.json`);
  const channel = nono.client.channels.cache.find(channel => channel.id === `768882922379280464`);
  const bannedWords = words.words;
  // Shifting to lowercase here allows case iNsEnSiTiViTy.
  const str = nono.content.toLowerCase().trim();
  const strArr = nono.content.toLowerCase().trim().split(" ");

  for (let index = 0; index < bannedWords.length; index++) {
    const ban = bannedWords[index];
    if (str.includes(ban)) {
      for (let index = 0; index < strArr.length; index++) {
        const element = strArr[index];
        if (element == ban) {
          nono.delete();
          filterEmbed(nono, channel);
          const notifier = require(`node-notifier`);
          notifier.notify({
              title: `${nono.member.displayName} in ${nono.channel.name}`,
              message: `${nono.content}`,
              icon: 'C:\\Users\\chris\\Pictures\\Chr1sDev\\chr1s.png',
              sound: false
          }); 
        }
      }
    }
  }

  function filterEmbed(nono, channel) {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${nono.member.displayName}`, `${nono.author.displayAvatarURL({ dynamic: true })}`)
    .setColor('#FF0000')
    .setTitle(`Filtered!!`)
    .setDescription(`**Word:** ${nono.content}`)
    .setFooter(`ID: ${nono.id}`);
    channel.send(embed);
  }

});


client.on(`guildMemberWarned`, (warnedMember, reason, warner) => {
  const channel = client.channels.cache.find(channel => channel.id === `759967435309842494`); // #audit-log
  warnEmbed(channel, warnedMember, reason, warner);

});

function warnEmbed(channel, member, reason, warner) {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.displayName}`, `${member.user.displayAvatarURL({ dynamic: true })}`)
  .setColor('#F3D40C')
  .setTitle(`Member Warned!`)
  .setDescription(`**Reason: ${reason}\nBy:** ${warner}`)
  .setFooter(`ID: ${member.id}`);
  channel.send(embed);
}



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

























//   /* =-=-=-=-=-=-=-= Leaderboard Server =-=-=-=-=-=-=-= */
//   const express = require('express');
//   const app = express();

//   app.get("/", function (req, res) {
//       res.sendFile(__dirname + "/index.html");
//   });
//   app.listen(420, function () {
//       console.log("Server is running on localhost:420");
//   });
// /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-= */

client.login(token)

