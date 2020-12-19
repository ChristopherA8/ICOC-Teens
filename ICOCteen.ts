/*

// ICOC Teens bot! A multipurpose chat bot for Discord. Features include, moderation, sound effects, XP/Leveling, etc...
// Written completely in TypeScript!
// Invite Link
// https://discord.com/api/oauth2/authorize?client_id=761792910088994816&permissions=8&scope=bot

*/

// INCLUDES
const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.json');
const { prefix, token, webhookURL } = require('./config.json');
const SQLite = require('better-sqlite3');

// Create SQLite database
const sql = new SQLite('./databases/scores.sqlite');

// Instantiate new Discord Client
const client = new Discord.Client()

////////////////////
// COMMAND HANDLER
////////////////////

// Searches through "./commands" for files ending in .ts
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));
const otherCommandFiles = fs.readdirSync('./commands/fun').filter(file => file.endsWith('.ts'));
const infoCommandFiles = fs.readdirSync('./commands/info').filter(file => file.endsWith('.ts'));
const miscCommandFiles = fs.readdirSync('./commands/misc').filter(file => file.endsWith('.ts'));
const modCommandFiles = fs.readdirSync('./commands/mod').filter(file => file.endsWith('.ts'));
const xpCommandFiles = fs.readdirSync('./commands/xp').filter(file => file.endsWith('.ts'));

// Add file names to command collection
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
for (const file of otherCommandFiles) {
	const command = require(`./commands/fun/${file}`);
	client.commands.set(command.name, command);
}
for (const file of infoCommandFiles) {
	const command = require(`./commands/info/${file}`);
	client.commands.set(command.name, command);
}
for (const file of miscCommandFiles) {
	const command = require(`./commands/misc/${file}`);
	client.commands.set(command.name, command);
}
for (const file of modCommandFiles) {
	const command = require(`./commands/mod/${file}`);
	client.commands.set(command.name, command);
}
for (const file of xpCommandFiles) {
	const command = require(`./commands/xp/${file}`);
	client.commands.set(command.name, command);
}




// Runs on ready
client.on('ready', () => {

  console.log("Connected as " + client.user.tag + ", Icoc Teens Bot is online")
  //Set Bot Status
  client.user.setActivity("please don't spam", {type: "LISTENING"})

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

  //var teensrole = join.guild.roles.cache.get("698634625077215372");
  //Commented out because of the Verification system
  //join.roles.add(teensrole);
  const channel = join.client.channels.cache.find(channel => channel.id == `698591277205422171`);
  channel.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>`);
  //<a:wave:780628982268690454>
  //<a:wavehi:769217908373979156>

});


client.on('message', msg => {

  if (msg.channel.type === 'dm') return;

  if ((msg.content.match(/\bsimp\b/ig))) {
      msg.channel.send(`Therefore, my dear friends, flee from idolatry. - 1 Corinthians 10:14`);
  }

  if (msg.content.includes(`ur mom`) || (msg.content.includes(`your mom`))) {
    msg.channel.send(`airhorn airhorn airhorn`);
  }

  var enabled = true;
  if (msg.content.startsWith('!stopxp') && (msg.author.id == '279032930926592000')) {
    enabled = false;
  }

  if (msg.content.startsWith('!startxp') && (msg.author.id == '279032930926592000')) {
    enabled = true;
  }

if (enabled) {

  //disable xp in #rules
    if (msg.channel.id !== `770730379077353494`) {
    if (msg.author.bot) return;
    let score;
    score = client.getScore.get(msg.author.id, msg.guild.id);
    if (!score) {
      score = { id: `${msg.guild.id}-${msg.author.id}`, user: msg.author.id, guild: msg.guild.id, points: 0, level: 1, name: msg.author.tag}
    }
    if (!score.name) {
      score.name = msg.author.tag;
    }
    function getXP() {
      // var words = msg.content.split(" ");
      // var wordCount = words.length;
      // if (wordCount <= 25) {
      //   score.points += wordCount;
      // } else {
      //   score.points += 25;
      // }
      score.points++;
      client.setScore.run(score);
    }
    setTimeout(getXP, 6000);
    //getXP();

    const curLevel = Math.floor(0.3 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      msg.reply(`You've leveled up to level **${curLevel}**!`);
    }
    client.setScore.run(score);

    
/*     const top = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 1").get(msg.guild.id);
    const topMem = msg.guild.members.cache.get(top.id.substr(19));
    if (!topMem.roles.cache.has(`786101864357167104`)) {
      var oldMem = msg.guild.members.cache.filter(mem => mem.roles.cache.has(`786101864357167104`));
      var oldMem = oldMem.array();
      for(const topMembers of oldMem) {
        topMembers.roles.remove(`786101864357167104`);
        //console.log(topMembers);
      }
      topMem.roles.add(`786101864357167104`);
    } */


  }//end of rules channel check

    // if (msg.content.startsWith(`!xp`) || msg.content.startsWith(`!rank`)) {
    //   //msg.channel.send(`**REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT**`);
      
    //   const ping = msg.mentions.members.first();

    //   if (!ping) {
    //     let score;
    //     score = client.getScore.get(msg.author.id, msg.guild.id);
    //     const exampleEmbed = new Discord.MessageEmbed()
    //     .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
    //     .setColor('#00FF86')
    //     //.setFooter(`ID: ${msg.author.id}`)
    //     .addFields(
    //       { name: '**XP:**', value: `${score.points}`, inline: true},
    //       { name: '**Level:**', value: `${score.level}`, inline: true}
    //     )
    //     msg.channel.send(exampleEmbed);
    //   } else {
    //     let scorePing;
    //     scorePing = client.getScore.get(ping.id, msg.guild.id);
    //     const exampleEmbed = new Discord.MessageEmbed()
    //     .setAuthor(`${ping.displayName}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
    //     .setColor('#00FF86')
    //     //.setFooter(`ID: ${msg.author.id}`)
    //     .addFields(
    //       { name: '**XP:**', value: `${scorePing.points}`, inline: true},
    //       { name: '**Level:**', value: `${scorePing.level}`, inline: true}
    //     )
    //     msg.channel.send(exampleEmbed);
    //   }

    // }
/*
  if (msg.content.startsWith(`!lvlup`) && (msg.author.id == `279032930926592000` || msg.author.id == `329039487474860032`  || msg.author.id == `707844228977524757`)) {
    score.level++;
    msg.channel.send(`Leveled up!`);
    client.setScore.run(score);
  }

  if (msg.content.startsWith(`!lvldown`) && (msg.author.id == `279032930926592000` || msg.author.id == `329039487474860032`  || msg.author.id == `707844228977524757`)) {
    score.level--;
    msg.channel.send(`Leveled down!`);
    client.setScore.run(score);
  }

  if (msg.content.startsWith(`!setxp`) && (msg.author.id == `620438897217896459`)) {
    var input = msg.content.substr(6).trim();
    if (input === '') {
      msg.channel.send(`**Error:** Enter Amount!`);
    } else {
      input = Number(input);
      score.points = input;
      const newLevel = Math.floor(0.3 * Math.sqrt(input));
      score.level = newLevel;
      client.setScore.run(score);
      msg.channel.send(`**XP Set To:** ${input}`);
    }
  }
//620438897217896459
*/

  }//end of enabled chech

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
      setTimeout(() => {
        msg.delete();
      }, 3000);
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
/* if (voice.content.startsWith(`${prefix}play`)) {
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
 */

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

});


///////////////////////////////////////
// MEMBER LOGGING
///////////////////////////////////////

client.on('guildMemberUpdate', async (oldMember, newMember) => {

const channel = oldMember.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  //declare changes
  var Changes = {
    unknown: 0,
    addedRole: 1,
    removedRole: 2,
    username: 3,
    nickname: 4,
    avatar: 5,
  };
  var change = Changes.unknown;
  var removedRole;
  var addedRole;

  //Removed role
  oldMember.roles.cache.forEach((value) => {
    if (!newMember.roles.cache.find((role) => role.id === value.id)) {
     change = Changes.removedRole;
     removedRole = value.name;
    }
  });

  //Added role
  newMember.roles.cache.forEach((value) => {
    if (!oldMember.roles.cache.find((role) => role.id === value.id)) {
      change = Changes.addedRole;
      addedRole = value.name;

      if ((value.id == `765244241643044935`) && (newMember.id == `689910756711727193`)) {
        newMember.roles.remove(`765244241643044935`);
      }

    }
  });

  //nickname changed
  if (oldMember.nickname !== newMember.nickname) {
    change = Changes.nickname;
  }

  switch (change) {
    case Changes.addedRole:
      addRole(addedRole, oldMember, channel);
      break;
    case Changes.removedRole:
      delRole(removedRole, oldMember, channel);
      break;
    case Changes.nickname:
      nick(oldMember, newMember, channel);
      break;
  }



////////////////////////
// EMBEDS
////////////////////////

function delRole(removedRole, oldMember, auditChannel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`${oldMember.displayName}`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
  .setColor('#00FF86')
  .setFooter(`ID: ${oldMember.id}`)
  .setDescription(`Role Removed: \`${removedRole}\``)
  //.setThumbnail(`${oldMember}`)
  auditChannel.send(exampleEmbed);

}

function addRole(addedRole, oldMember, auditChannel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`${oldMember.displayName}`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
  .setColor('#00FF86')
  .setFooter(`ID: ${oldMember.id}`)
  .setDescription(`Role Added: \`${addedRole}\``)
  //.setThumbnail(`${oldMember}`)
  auditChannel.send(exampleEmbed);

}

function nick(oldMember, newMember, auditChannel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`${oldMember.displayName}`, `${oldMember.user.displayAvatarURL({ dynamic: true })}`)
  .setColor('#00FF86')
  .setFooter(`ID: ${oldMember.id}`)
  .setDescription(`Nickname Changed:\n\nOld: \`${oldMember.displayName}\` -> New: \`${newMember.displayName}\``)
  auditChannel.send(exampleEmbed);

}

});

client.on('guildMemberRemove', async member => {

  const channel = member.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
  });
  const kickLog = fetchedLogs.entries.first();
  if (!kickLog) return embed(channel, `${member.user.tag} left the guild <:dead:765721212033695784>`, member) //channel.send(`> ${member.user.tag} left the guild <:dead:765721212033695784>`);

  // We now grab the user object of the person who kicked our member
  // Let us also grab the target of this action to double check things
  const { executor, target } = kickLog;

  // And now we can update our output with a bit more information
  // We will also run a check to make sure the log we got was for the same kicked member
  if (target.id === member.id) {
    embed(channel, `${member.user.tag} left the guild; kicked by ${executor.tag}? <:dead:765721212033695784>`, member) //channel.send(`> ${member.user.tag} left the guild; kicked by ${executor.tag}? <:dead:765721212033695784>`);
  } else {
    embed(channel, `${member.user.tag} left the guild, audit log fetch was inconclusive. <:dead:765721212033695784><:dead:765721212033695784><:dead:765721212033695784>`, member) //channel.send(`> ${member.user.tag} left the guild, audit log fetch was inconclusive. <:dead:765721212033695784><:dead:765721212033695784><:dead:765721212033695784>`);
  }
});

//embed
function embed(channel, info, member) {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.displayName}`, `${member.user.displayAvatarURL({ dynamic: true })}`)
  .setColor(`#FF0000`)
  .setFooter(`ID: ${member.id}`)
  .setDescription(`${info}`);
  channel.send(embed);
}
///

//////////////////////////////////
// USER LOGGING
//////////////////////////////////

client.on(`userUpdate`, (oldUser, newUser) => {

  const channel = oldUser.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  if (oldUser.username !== newUser.username) {
    username(oldUser, newUser, channel);
  }

///////////////////////
// EMBEDS
///////////////////////

function username(oldUser, newUser, auditChannel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`${oldUser.username}`, `${oldUser.displayAvatarURL({ dynamic: true })}`)
  .setColor('#00FF86')
  .setFooter(`ID: ${oldUser.id}`)
  .setDescription(`Username Changed:\n\nOld: \`${oldUser.username}\` -> New: \`${newUser.username}\``)
  auditChannel.send(exampleEmbed);

}

});

//////////////////////////////////
// CHANNEL LOGGING
//////////////////////////////////

client.on('channelCreate', newChannel => {

  const channel = newChannel.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  addChannel(newChannel, channel);

  //////////////////
  // EMBED
  //////////////////

  function addChannel(newChannel, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Channel Updated -`)
    .setColor('#00FF86')
    .setFooter(`Channel ID: ${newChannel.id}`)
    .setDescription(`Channel Created: \`#${newChannel.name}\``)
    channel.send(exampleEmbed);

  }

});


client.on('channelDelete', removedChannel => {

  const channel = removedChannel.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  removeChannel(removedChannel, channel);

  //////////////////
  // EMBED
  //////////////////

  function removeChannel(removedChannel, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Channel Updated -`)
    .setColor('#00FF86')
    .setFooter(`Channel ID: ${removedChannel.id}`)
    .setDescription(`Channel Removed: \`#${removedChannel.name}\``)
    channel.send(exampleEmbed);

  }

});

client.on(`channelUpdate`, (oldChannel, newChannel) => {

  const channel = oldChannel.client.channels.cache.find(channel => channel.id === `759967435309842494`);

  if(newChannel.name !== oldChannel.name) {
    channelName(oldChannel, newChannel, channel);
  }
  
  if(newChannel.bitrate !== oldChannel.bitrate) {
    bitrate(oldChannel, newChannel, channel);
  }

  //////////////////
  // EMBED
  //////////////////

  function channelName(oldChannel, newChannel, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Channel Updated -`)
    .setColor('#00FF86')
    .setFooter(`Channel ID: ${newChannel.id}`)
    .setDescription(`Channel Name Changed:\n\nOld: \`${oldChannel.name}\` -> New: \`${newChannel.name}\``)
    channel.send(exampleEmbed);

  }

  function bitrate(oldChannel, newChannel, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Channel Updated -`)
    .setColor('#00FF86')
    .setFooter(`Channel ID: ${newChannel.id}`)
    .setDescription(`Channel Bitrate Changed:\n\nOld: \`${oldChannel.bitrate / 1000}kbps\` -> New: \`${newChannel.bitrate / 1000}kbps\``)
    channel.send(exampleEmbed);

  }

});


////////////////////////////
// ROLE LOGGING
////////////////////////////

client.on(`roleCreate`, newRole => {

const channel = newRole.client.channels.cache.find(channel => channel.id === `759967435309842494`);

createRole(newRole, channel);
  

  //////////////////
  // EMBED
  //////////////////

  function createRole(newRole, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Roles Updated -`)
    .setColor('#00FF86')
    .setFooter(`Role ID: ${newRole.id}`)
    .setDescription(`Role Created: ${newRole}`)
    channel.send(exampleEmbed);

  }

});

client.on(`roleDelete`, delRole => {

  const channel = delRole.client.channels.cache.find(channel => channel.id === `759967435309842494`);
  
  deleteRole(delRole, channel);
    
  
    //////////////////
    // EMBED
    //////////////////
  
    function deleteRole(delRole, channel) {
      
      const exampleEmbed = new Discord.MessageEmbed()
      .setAuthor(`Roles Updated -`)
      .setColor('#00FF86')
      .setFooter(`Role ID: ${delRole.id}`)
      .setDescription(`Role Removed: \`${delRole.name}\``)
      channel.send(exampleEmbed);
  
    }
  
});

client.on(`roleUpdate`, (oldRole, newRole) => {

  const channel = oldRole.client.channels.cache.find(channel => channel.id === `759967435309842494`);
  
  if (oldRole.name !== newRole.name) {
    roleName(oldRole, newRole, channel);
  }

  
    //////////////////
    // EMBED
    //////////////////
  
    function roleName(oldRole, newRole, channel) {
      
      const exampleEmbed = new Discord.MessageEmbed()
      .setAuthor(`Roles Updated -`)
      .setColor('#00FF86')
      .setFooter(`Role ID: ${newRole.id}`)
      .setDescription(`Role Name Changed:\n\nOld: \`${oldRole.name}\` -> New: \`${newRole.name}\``)
      channel.send(exampleEmbed);
  
    }
  
});

/////////////////////
// MESSAGE LOGGING
/////////////////////

client.on(`messageDelete`, async del => {
  if (del.author.bot) return;
  if (del.channel.type === 'dm') return;

  var deletedMessage = del.content;
  const channel = del.client.channels.cache.find(channel => channel.id === `768882922379280464`);
    if (del.author.id !== `234395307759108106` && del.author.id !== `765662774445080616`) {
      delMsg(del, channel);
    }
});
//////////////////
// EMBED
//////////////////

function delMsg(del, channel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`Message Updated -`)
  .setColor('#00FF86')
  .setFooter(`Message Author: ${del.author.tag} | In Channel: ${del.channel.name}`)
  .setDescription(`**Message Deleted:** \n\`\`\`${del}\`\`\``);
  channel.send(exampleEmbed);

};

client.on(`messageDeleteBulk`, bulk => {

  const channel = client.channels.cache.find(channel => channel.id === `768882922379280464`);

  var i = 1;
  var bulkDel = bulk.map((b) => b.content).join(`\n`);

  bulkDelEmbed(bulk, channel, bulkDel);

  ///////////////
  // EMBED
  ///////////////

  function bulkDelEmbed(bulk, channel, array) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Message Updated -`)
    .setColor('#00FF86')
    //.setFooter(`Message(s) Author: ${array.author.tag}`)
    .setDescription(`${array.size} Message(s) Deleted (reverse order): \n\`\`\`${array}\`\`\``)
    channel.send(exampleEmbed);

  }

});

client.on(`messageUpdate`, (oldMsg, newMsg) => {

  const channel = client.channels.cache.find(channel => channel.id === `768882922379280464`);

  if (oldMsg.content !== newMsg.content) {
    editMessage(oldMsg, newMsg, channel);
  }


  //////////////////
  // EMBED
  //////////////////

  function editMessage(oldMsg, newMsg, channel) {
    
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`Message Updated -`)
    .setColor('#00FF86')
    .setFooter(`Message ID: ${newMsg.id}`)
    //.setDescription(`Message Edited:\nIn Channel ${newMsg.channel.toString()}\nOld: \`\`\`${oldMsg.content}\`\`\` \nNew: \`\`\`${newMsg.content}\`\`\``)
    .addFields(
      { name:`In Channel:`, value:`${newMsg.channel.toString()}`, inline: true },
      { name:`Message Contents:`, value:`Old: \`\`\`${oldMsg.content.replace("`", `\``).replace("`", `\``).replace("`", `\``).replace("`", `\``).replace("`", `\``).replace("`", `\``).replace("`", `\``).replace("`", `\``)}\`\`\` \nNew: \`\`\`${newMsg.content.replace("`", `\``)}\`\`\``, inline: false },
    )
    channel.send(exampleEmbed);

  }

});

//////////////////////
// INVITE LOGGING
//////////////////////

client.on(`inviteCreate`, inv => {

  const channel = inv.client.channels.cache.find(channel => channel.id === `759967435309842494`);
  createInv(inv, channel);

//////////////////
// EMBED
//////////////////

function createInv(inv, channel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`Invite Created -`)
  .setColor('#00FF86')
  .setFooter(`Invite Code: ${inv.code}`)
  .addFields(
    { name:`Invite URL`, value:`<${inv}>`, inline: true },
    { name:`Invite Maker:`, value:`${inv.inviter}`, inline: false },
    { name:`Max Uses:`, value:`${inv.maxUses}`, inline: true },
    { name:`Length:`, value:`${inv.maxAge}`, inline: true }
  )
  //.setDescription(`Invite Created: ${inv}`)
  channel.send(exampleEmbed);

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

client.login(token)

