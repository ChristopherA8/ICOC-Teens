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

//Include Command Files ending in .ts or .js
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');


// Runs once at startup
client.on('ready', () => {

    // Sets Bot Status
    console.log("Connected as " + client.user.tag + ", Icoc Teens Bot is online")
    //client.user.setActivity("!help", {type: "PLAYING"})
    client.user.setActivity("new challenges from David Cole", {type: "WATCHING"})

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
    //Moderation
    client.getWarns = sql.prepare("SELECT * FROM moderation WHERE id = ?");
    client.setWarns = sql.prepare("INSERT OR REPLACE INTO moderation (id, name, warns) VALUES (@id, @name, @warns);");

});

//Runs when a member joins a guild
client.on('guildMemberAdd', join => {

  //var teensrole = join.guild.roles.cache.get("698634625077215372");
  //Commented out because of the Verification system
  //join.roles.add(teensrole);
  const channel = join.client.channels.cache.find(channel => channel.id == `698591277205422171`);
  channel.send(`Welcome ${join} to ICOC Teens! <a:wavehi:769217908373979156>`);

});


client.on('message', msg => {

  if (msg.channel.type === 'dm') return;

  if (msg.content.includes(`ur mom`) || (msg.content.includes(`your mom`))) {
    msg.channel.send(`airhorn airhorn airhorn`);
  }

  //////////////////////
  // XP
  //////////////////////

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
      score.points++;
      client.setScore.run(score);
    }
    setTimeout(getXP, 6000);
    //score.points++;
    const curLevel = Math.floor(0.3 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      msg.reply(`You've leveled up to level **${curLevel}**!`);
    }
    client.setScore.run(score);


    if (msg.content.startsWith(`!xp`) || msg.content.startsWith(`!rank`)) {
      //msg.channel.send(`**REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT REPENT**`);
      
      const ping = msg.mentions.members.first();

      if (!ping) {
        let score;
        score = client.getScore.get(msg.author.id, msg.guild.id);
        const exampleEmbed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
        .setColor('#00FF86')
        //.setFooter(`ID: ${msg.author.id}`)
        .addFields(
          { name: '**XP:**', value: `${score.points}`, inline: true},
          { name: '**Level:**', value: `${score.level}`, inline: true}
        )
        msg.channel.send(exampleEmbed);
      } else {
        let scorePing;
        scorePing = client.getScore.get(ping.id, msg.guild.id);
        const exampleEmbed = new Discord.MessageEmbed()
        .setAuthor(`${ping.displayName}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
        .setColor('#00FF86')
        //.setFooter(`ID: ${msg.author.id}`)
        .addFields(
          { name: '**XP:**', value: `${scorePing.points}`, inline: true},
          { name: '**Level:**', value: `${scorePing.level}`, inline: true}
        )
        msg.channel.send(exampleEmbed);
      }

    }

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
/*
  if (msg.content.startsWith(`!setxp`) && (msg.author.id == `620438897217896459`)) {
    var input = msg.content.split(' ');
    if (input[1] == null) {
      msg.channel.send(`**Error:** Format \`!setxp @user amount\``);
    } else {
      const ping = msg.mentions.members.first();
      let scorePing;
      if (ping) {
        input[2] = Number(input[2]);
        scorePing = client.getScore.get(ping.id, msg.guild.id);
        scorePing.points = input[2];
        const newLevel = Math.floor(0.3 * Math.sqrt(input[2]));
        scorePing.level = newLevel;
        client.setScore.run(scorePing);
        msg.channel.send(`**XP Set To:** ${input[2]}`);
      }
    }
  }

  if (msg.content.startsWith(`!givexp`) && (msg.author.id == `620438897217896459`)) {
    var input = msg.content.substr(7).trim();
    if (input === '') {
      msg.channel.send(`**Error:** Enter Amount!`);
    } else {
      input = Number(input);
      score.points = score.points + input;
      client.setScore.run(score);
      msg.channel.send(`**XP Given:** ${input}`);
    }
  }

  if (msg.content.startsWith(`!removexp`) && (msg.author.id == `620438897217896459`)) {
    var input = msg.content.substr(9).trim();
    if (input === '') {
      msg.channel.send(`**Error:** Enter Amount!`);
    } else {
      input = Number(input);
      score.points = score.points - input;
      client.setScore.run(score);
      msg.channel.send(`**XP Removed:** ${input}`);
    }
  }*/

  if (msg.content == `!resetxp`) {
    let score;
    score = client.getScore.get(msg.author.id, msg.guild.id);
    score.points = 0;
    client.setScore.run(score);
  }

  if (msg.content == `!resetlvl`) {
    let score;
    score = client.getScore.get(msg.author.id, msg.guild.id);
    score.level = 0;
    client.setScore.run(score);
  }

  if ((msg.content == `!top`) || (msg.content == `!lead`)) {
    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10").all(msg.guild.id);
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
    .setColor('#00FF86')
    .setDescription(`\`\`\`md\n1. ${top10[0].name} | XP: ${top10[0].points}\n2. ${top10[1].name} | XP: ${top10[1].points}\n3. ${top10[2].name} | XP: ${top10[2].points}\n4. ${top10[3].name} | XP: ${top10[3].points}\n5. ${top10[4].name} | XP: ${top10[4].points}\n6. ${top10[5].name} | XP: ${top10[5].points}\n7. ${top10[6].name} | XP: ${top10[6].points}\n8. ${top10[7].name} | XP: ${top10[7].points}\n9. ${top10[8].name} | XP: ${top10[8].points}\n10. ${top10[9].name} | XP: ${top10[9].points}\n\`\`\``)
    msg.channel.send(exampleEmbed);
  }

  if (msg.content.startsWith(`!setname`)) {
    score.name = msg.content.substr(8).trim();
    msg.channel.send(`Name set to: "${msg.content.substr(8).trim()}"`);
    client.setScore.run(score);
  }

  if (msg.content == `!name`) {
    let score;
    score = client.getScore.get(msg.author.id, msg.guild.id);
    msg.channel.send(`Name: "${score.name}"`);
  }

  let mod;
  mod = client.getWarns.get(msg.author.id);
  if (!mod) {
    mod = { id: msg.author.id, name: msg.author.tag, warns: 0}
  }
  client.setWarns.run(mod);

  if (msg.content.startsWith(`!listwarns`)) {
    const ping = msg.mentions.members.first();

    if (!ping) {
    const exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
    .setColor('#00FF86')
    .setDescription(`Warns: ${mod.warns}`)
    msg.channel.send(exampleEmbed);
    } else {
      let modPing;
      modPing = client.getWarns.get(ping.id);
      const exampleEmbed = new Discord.MessageEmbed()
      .setAuthor(`${ping.user.tag}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
      .setColor('#00FF86')
      .setDescription(`Warns: ${modPing.warns}`)
      msg.channel.send(exampleEmbed);
    }
  }

  if (msg.content.startsWith(`!warn`)) {
    const ping = msg.mentions.members.first();

    if (!ping) {
      msg.channel.send(`**Error:** Ping the person you want to warn!`);
    } else {
      let modPing;
      modPing = client.getWarns.get(ping.id);
      msg.channel.send(`${ping} has been warned! :eyes:`);
      modPing.warns++;
      client.setWarns.run(modPing);
    }
  }

  if (msg.content.startsWith(`!clearwarns`)) {
    let mod;
    const ping = msg.mentions.members.first();

    if (!ping) {
      msg.channel.send(`**Error:** Ping the person you want to clear!`);
    } else {
      mod = client.getWarns.get(ping.id);
      msg.channel.send(`${ping} warns have been cleared! <a:nezukovibin:745998060731105291>`);
      mod.warns = 0;
      client.setWarns.run(mod);
    }
  }
  
  }//if for the #rules channel

/*
  if (msg.content == `!purge`) {
    sql.close();
    fs.unlinkSync(`./scores.sqlite`);
    fs.unlinkSync(`./scores.sqlite-shm`);
    fs.unlinkSync(`./scores.sqlite-wal`);
    
   msg.channel.send(`***XP RESET!!***`);
}*/



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
    } else if(msg.content.startsWith(`${prefix}access`)) {
      command.execute(msg, args);
    } else if(msg.content.startsWith(`${prefix}ticket`)) {
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
/*
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
    let result = await searcher.search(usrInput).catch(error => console.log(error));

    const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' }, {highWaterMark: 1024 * 1024 * 10});
    voice.channel.send(`> **Now Playing:** ${result.first.url}`);

    dispatcher.on('finish', () => voiceChannel.leave());

  });
}
}
*/

if (voice.content.startsWith(`${prefix}play`)) {
  voice.channel.send(`**Error:** Play has been temporarily/not so temporarily disabled while I squash some bugs :smile:`);
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
  if (!kickLog) return channel.send(`> ${member.user.tag} left the guild <:dead:765721212033695784>`);

  // We now grab the user object of the person who kicked our member
  // Let us also grab the target of this action to double check things
  const { executor, target } = kickLog;

  // And now we can update our output with a bit more information
  // We will also run a check to make sure the log we got was for the same kicked member
  if (target.id === member.id) {
    channel.send(`> ${member.user.tag} left the guild; kicked by ${executor.tag}? <:dead:765721212033695784>`);
  } else {
    channel.send(`> ${member.user.tag} left the guild, audit log fetch was inconclusive. <:dead:765721212033695784><:dead:765721212033695784><:dead:765721212033695784>`);
  }
});

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

client.on(`messageDelete`, del => {

  var deletedMessage = del.content;
  const channel = del.client.channels.cache.find(channel => channel.id === `768882922379280464`);

  if (del.author.id !== `234395307759108106` && del.author.id !== `765662774445080616`) {
    delMsg(del, channel);
  }

    
  
//////////////////
// EMBED
//////////////////

function delMsg(del, channel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`Message Updated -`)
  .setColor('#00FF86')
  .setFooter(`Message Author: ${del.author.tag} | In Channel: ${del.channel.name}`)
  .setDescription(`Message Deleted: \n\`\`\`${del}\`\`\``)
  channel.send(exampleEmbed);

}

});

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
      { name:`In Channel:`, value:`"${newMsg.channel.toString()}"`, inline: true },
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
// BAD BAD NONO WORD HEHEHEHEHEHE
//////////////////////////////////
/*
client.on(`message`, nono => {

  const words = require(`./bannedWords.json`);

  const channel = nono.client.channels.cache.find(channel => channel.id === `698594785803501629`);

const arr = words.words;
const str = nono.content;

for (let i = 0; i < arr.length; i++) {
  const elem = arr[i];
  
  // Shifting to lowercase here allows case iNsEnSiTiViTy.
  if (str.toLowerCase().includes(elem)) {
    nono.delete();
    nono.channel.send(`Get Rekt <:PikaKek:761290239046058016> <:PikaKek:761290239046058016>`);
  }
}

})

*/




client.login(token)

