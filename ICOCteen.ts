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
const { prefix, token } = require('./config.json');
const SQLite = require('better-sqlite3');
const client = new Discord.Client()
let colors = require('colors/safe');
const sql = new SQLite('./databases/scores.sqlite');
const DisTube = require('distube')

// New DisTube instance
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

// Custom Modules
const { logging } = require('./modules/logging.ts');
const { commands } = require('./modules/commandHandler.ts');
const { webserver } = require('./modules/webserver.ts');
const { welcome } = require('./modules/welcome.ts');
const { voiceEvents } = require('./modules/voiceEvents.ts');
logging(client); // Start logging
commands(client); // Add command files to collection
webserver(client); // Web Server for literally no reason
welcome(client); // Welcome new members
voiceEvents(client);


// Runs on ready
client.on('ready', async () => {
  
  const { clubReactions } = require('./modules/clubs.ts');
  await clubReactions(client, Discord); // Club Reactions

  console.log(colors.red(`Connected as ${client.user.tag}`));
  let guild = await client.guilds.cache.get('698590629344575500');
  await client.user.setActivity(`${guild.members.cache.size} members`, {type: "WATCHING"})

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


client.on('message', async msg => {

  let name = msg.content.slice(prefix.length).split(/ +/).shift().toLowerCase();
  const accept = require('./commands/other/accept.ts');
  if (name == `accept`) {
    accept.execute(msg);
  }

  // KEEP SPAM OUT OF #RULES
  if ((msg.channel.id == `770730379077353494`)) {
    await msg.delete();
    return;
  }

  if (msg.channel.type === 'dm') return;
  if (msg.author.bot) return;

  const { listen } = require('./modules/messageListener.ts');
  const { shopMemberWatcher } = require('./modules/shopMemberWatcher.ts');
  const { xpListener } = require('./modules/score.ts');
  const { filter } = require('./modules/wordfilter.ts');
  const { stats } = require('./modules/stats.ts');
  const { voice } = require('./modules/voicecommands.ts');
  const { feedbackListener } = require('./modules/feedback.ts');
  feedbackListener(msg);
  if (msg.channel.id == `803446581222309888`) return;
  listen(msg);
  shopMemberWatcher(msg);
  xpListener(msg, client);
  filter(msg, fs, Discord);
  stats(msg, Discord, fs, prefix);
  await voice(msg, prefix);


  let botCommandsChannel = msg.guild.channels.cache.get(`776264945800052746`);

  if ((((msg.channel.id !== `776264945800052746`)) && (msg.content.includes(`!xp`)))) {
    await msg.reply(`Use that in ${botCommandsChannel}`);
    return;
  }

  if (((msg.channel.id !== `776264945800052746`)) && (msg.content.includes(`!top`))) {
    await msg.reply(`Use that in ${botCommandsChannel}`);
    return;
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
    await msg.reply(`\**Crashlog:\** ${error}`);
  }

});



  /* =-=-=-=-=-=-=-=-=-= Slash Commands!! =-=-=-=-=-=-=-=-=-= */

  const discordJsHandlers = require('./node_modules/discord.js/src/client/websocket/handlers/index');
  let commandName;
  let channelID;
  let guildID;
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
    let guild = client.guilds.cache.find(guild => guild.id == guildID)
    let channel = guild.channels.cache.get(channelID)
    let { giphy } = require(`./config.json`);
    let fetch = require(`node-fetch`);
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphy}&tag=frog&rating=g`)
    .then(res => res.json())
    .then(api => {
        channel.send(api.data.url)
    })
  }

  function bear(guildID, channelID) {
    let guild = client.guilds.cache.find(guild => guild.id == guildID)
    let channel = guild.channels.cache.get(channelID)
    let { tenor } = require(`./config.json`);
    let fetch = require(`node-fetch`);
    fetch(`https://api.tenor.com/v1/random?key=${tenor}&q=cute%20bears&locale=en_US&contentfilter=medium&limit=1`)
    .then(res => res.json())
    .then(api => {
        channel.send(api.results[0].url)
    })
  }

  /* =-=-=-=-=-=-=-=-=-= END OF Slash Commands!! =-=-=-=-=-=-=-=-=-= */














  // const { Client } = require('discord.js');
  // const { Shoukaku } = require('shoukaku');
  
  // const LavalinkServer = [{ name: 'Localhost', host: 'localhost', port: 6049, auth: 'hi' }];
  // const ShoukakuOptions = { moveOnDisconnect: false, resumable: false, resumableTimeout: 30, reconnectTries: 2, restTimeout: 10000 };
  
  // class musicClient extends Client {
  //     constructor(opts) {
  //         super(opts);
  //         this.shoukaku = new Shoukaku(this, LavalinkServer, ShoukakuOptions);
  //     }
  
  //     login(token) {
  //         this._setupShoukakuEvents();
  //         this._setupClientEvents();
  //         return super.login(token);
  //     }
  
  //     _setupShoukakuEvents() {
  //         this.shoukaku.on('ready', (name) => console.log(`Lavalink ${name}: Ready!`));
  //         this.shoukaku.on('error', (name, error) => console.error(`Lavalink ${name}: Error Caught,`, error));
  //         this.shoukaku.on('close', (name, code, reason) => console.warn(`Lavalink ${name}: Closed, Code ${code}, Reason ${reason || 'No reason'}`));
  //         this.shoukaku.on('disconnected', (name, reason) => console.warn(`Lavalink ${name}: Disconnected, Reason ${reason || 'No reason'}`));
  //     }
  
  //     _setupClientEvents() {
  //         this.on('message', async (msg) => {
  //             if (msg.author.bot || !msg.guild) return;
  //             if (!msg.content.startsWith('$play')) return;
  //             if (this.shoukaku.getPlayer(msg.guild.id)) return;
  //             const args = msg.content.split(' ');
  //             if (!args[1]) return;
  //             const node = this.shoukaku.getNode();
  //             let data = await node.rest.resolve(args[1]);
  //             if (!data) return;
  //             const player = await node.joinVoiceChannel({
  //                 guildID: msg.guild.id,
  //                 voiceChannelID: msg.member.voice.channelID
  //             }); 
  //             player.on('error', (error) => {
  //                 console.error(error);
  //                 player.disconnect();
  //             });
  //             for (const event of ['end', 'closed', 'nodeDisconnect']) player.on(event, () => player.disconnect());
  //             data = data.tracks.shift();
  //             await player.playTrack(data); 
  //             await msg.channel.send("Now Playing: " + data.info.title);
  //         });
  //         this.on('ready', () => console.log('Bot is now ready'));
  //     }
  // }

  // new musicClient({ resumable: true }).login('NzYxNzkyOTEwMDg4OTk0ODE2.X3fw7w.JnqvV9hSQ_377D168-4DxvXm2bI').catch(console.error);





















client.login(token)

