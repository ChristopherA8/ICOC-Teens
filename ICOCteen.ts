// bot add link
// https://discord.com/api/oauth2/authorize?client_id=761792910088994816&permissions=8&scope=bot

//Permissions site
// https://discordapi.com/permissions.html#8

const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const client = new Discord.Client()
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));


//Include Command Files ending in .ts
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Runs once at startup
client.on('ready', () => {

    // Sets Bot Status
    console.log("Connected as " + client.user.tag + ", Icoc Teens Bot is online")
    client.user.setActivity("!help", {type: "PLAYING"})


});

//Runs when a member joins a guild
client.on('guildMemberAdd', join => {

  var member = join.guild.roles.cache.get("698634625077215372")
  join.roles.add(member);

});


client.on('message', msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
  	return msg.channel.send(`\**Error:\** You didn't provide any arguments, ${msg.author}!`);
  }

  try {
    command.execute(msg, args);
  } catch (error) {

    console.error(error);
    msg.reply(`\**Crashlog:\** ${error}`);
    
  }

});


client.on('message', async voice => {



const fs = require('fs');
const ytdl = require('ytdl-core-discord');
const { apiurl } = require('ytsearcher');
const { YTSearcher } = require('ytsearcher');
const searcher = new YTSearcher('AIzaSyB5z_jpc7739sKPjMOYJP13zyYXl9VPoZA');
var usrInput = voice.content.substr(5).trim();
let result = await searcher.search(usrInput);

if (voice.content.startsWith(`${prefix}play`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply('please join a voice channel first!');
  }


  if (usrInput === "") {
    voice.channel.send(`**Error:** Song name empty!`); 
  } else {
  voiceChannel.join().then(async connection => {

    const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' });
    voice.channel.send(`**Now Playing:** ${result.first.url}`);

    dispatcher.on('finish', () => voiceChannel.leave());

  });
}
}

if (voice.content.startsWith(`${prefix}stop`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply('please join a voice channel first!');
  }

  voiceChannel.leave();
}

if (voice.content.startsWith(`${prefix}bitrate`)) {
  if (voice.channel.type === 'dm') return;

  const voiceChannel = voice.member.voice.channel;

  if (!voiceChannel) {
    return voice.reply('please join a voice channel first!');
  }

  voice.channel.send(`**Channel Bitrate: **${voiceChannel.bitrate}bps`);
}

});


client.login(token)

