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

// Runs once at startup
client.on('ready', () => {

    // Sets Bot Status
    console.log("Connected as " + client.user.tag + ", Icoc Teens Bot is online")
    client.user.setActivity("!help", {type: "PLAYING"})


});

//Runs when a member joins a guild
client.on('guildMemberAdd', join => {

  var teensrole = join.guild.roles.cache.get("698634625077215372")
  join.roles.add(teensrole);
  const channel = join.client.channels.cache.find(channel => channel.id == `698591277205422171`);
  channel.send(`Welcome ${join} to ICOC Teens!`);

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

//////////////////////////////////////////////////
//Voice commands
//////////////////////////////////////////////////

client.on('message', async voice => {



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
  const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
  });
  const kickLog = fetchedLogs.entries.first();
  if (!kickLog) return console.log(`${member.user.tag} left the guild <:cry:>`);

  // We now grab the user object of the person who kicked our member
  // Let us also grab the target of this action to double check things
  const { executor, target } = kickLog;

  // And now we can update our output with a bit more information
  // We will also run a check to make sure the log we got was for the same kicked member
  if (target.id === member.id) {
      console.log(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
  } else {
      console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
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

  delMsg(del, channel);
    
  
//////////////////
// EMBED
//////////////////

function delMsg(del, channel) {
  
  const exampleEmbed = new Discord.MessageEmbed()
  .setAuthor(`Message Updated -`)
  .setColor('#00FF86')
  .setFooter(`Message Author: ${del.author.tag} | In Channel: ${del.channel.toString()}`)
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
      { name:`Message Contents:`, value:`Old: \`\`\`${oldMsg.content}\`\`\` \nNew: \`\`\`${newMsg.content}\`\`\``, inline: false },
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
    { name:`Invite URL`, value:`"<${inv}>"`, inline: true },
    { name:`Invite Maker:`, value:`${inv.inviter}`, inline: true },
    { name:`Max Uses:`, value:`${inv.maxUses}`, inline: false },
    { name:`Length:`, value:`${inv.maxAge}`, inline: true }
  )
  //.setDescription(`Invite Created: ${inv}`)
  channel.send(exampleEmbed);

}

});

client.login(token)

