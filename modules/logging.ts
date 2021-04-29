module.exports = {
  logging(client) {
    // THIS IS SO FREAKING COOL HAHAHAHAHHAH I CAN DO LOGGING IN A SEPERATE FILE : )   XDXDXDXD
    // const { client } = require('../ICOCteen.ts');
    const Discord = require("discord.js");

    ///////////////////////////////////////
    // MEMBER LOGGING
    ///////////////////////////////////////

    client.on("guildMemberUpdate", async (oldMember, newMember) => {
      if (newMember.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = oldMember.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

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
      let staffRoleCountTwo = 0;
      oldMember.roles.cache.forEach((value) => {
        if (!newMember.roles.cache.find((role) => role.id === value.id)) {
          change = Changes.removedRole;
          removedRole = value.name;
        }

        let bugHunter = `775448648229453865`;
        let cheff = `783864152606638130`;
        let david = `774117150859329586`;
        let song = `776222027723178004`;
        let gamer = `759909786472415273`;
        let frogEw = `776275846406340631`;
        let boiz = `776221452868648980`;
        let travel = `805919361978073139`;
        newMember.roles.cache.forEach((role) => {
          switch (role.id) {
            case bugHunter:
              staffRoleCountTwo++;
              break;
            case cheff:
              staffRoleCountTwo++;
              break;
            case david:
              staffRoleCountTwo++;
              break;
            case song:
              staffRoleCountTwo++;
              break;
            case gamer:
              staffRoleCountTwo++;
              break;
            case frogEw:
              staffRoleCountTwo++;
              break;
            case boiz:
              staffRoleCountTwo++;
              break;
            case travel:
              staffRoleCountTwo++;
              break;
            default:
              break;
          }
        });
        if (Number(staffRoleCountTwo < 6)) {
          newMember.roles.remove("698643225443041311");
        }
        // console.log(staffRoleCountTwo);
      });

      //Added role
      var staffRoleCount = 0;
      newMember.roles.cache.forEach((value) => {
        if (!oldMember.roles.cache.find((role) => role.id === value.id)) {
          change = Changes.addedRole;
          addedRole = value.name;

          if (value.id == `698650459187183672`) {
            teenLeaderWelcome(newMember);
          }

          /* =-=-=-= Automatically assign ICOC Goat =-=-=-= */
          var bugHunter = `775448648229453865`;
          var cheff = `783864152606638130`;
          var david = `774117150859329586`;
          var song = `776222027723178004`;
          var gamer = `759909786472415273`;
          var frogEw = `776275846406340631`;
          var boiz = `776221452868648980`;
          let travel = `805919361978073139`;
          newMember.roles.cache.forEach((role) => {
            switch (role.id) {
              case bugHunter:
                staffRoleCount++;
                break;
              case cheff:
                staffRoleCount++;
                break;
              case david:
                staffRoleCount++;
                break;
              case song:
                staffRoleCount++;
                break;
              case gamer:
                staffRoleCount++;
                break;
              case frogEw:
                staffRoleCount++;
                break;
              case boiz:
                staffRoleCount++;
                break;
              case travel:
                staffRoleCount++;
                break;
              default:
                break;
            }
          });
          if (Number(staffRoleCount >= 6)) {
            newMember.roles.add("698643225443041311");
          }
          // console.log(staffRoleCount);
        }
      });

      function teenLeaderWelcome(member) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`Welcome Teen Leader! `)
          .setDescription(
            `Here is a quick walk-through so that way you can get acquainted! If you have further questions afterwards feel free to reach out and ask David Cole or a Staff member!!\n\n**1.** If you’d like to post and introduce yourselves on the #《teen-leaders that’s where I would start.\n\n**2.** Then if you want to go read #:rotating_light:rules #:pencil:role-list & #:space_invader:staff that should help get you fairly acquainted with the server.\n\n**3.** I would mute the following channels: most of, if not all, clubs, the server maintenance category, #《bot-commands , #《homework-help , and then the archive category.\n\n**4.** As far as the staff Category I would change notifications to “@ mentions only” but I would not mute any of the channels in this category. (change notification settings by right-clicking on a channel)\n\n**5.** As far as the whole Teen leader category I leave that on and I allow all messages.\n\n**6.** Just go through and explore! Look and see the different channels. Also we have a ton of fun emojis!!\n\nIf you have further questions feel free to reach out to David Cole or a Staff member!\n\nLastly, if you are new to discord here is a great summary of how it works.\nhttps://www.youtube.com/watch?v=TJ13BA3-NR4`
          );
        member.send(embed);
      }

      //nickname changed
      if (oldMember.nickname !== newMember.nickname) {
        change = Changes.nickname;
      }

      // This doesn't work..... I don't think
      // pfp changed
      if (
        oldMember.user.displayAvatarURL() !== newMember.user.displayAvatarURL()
      ) {
        change = Changes.avatar;
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
        case Changes.avatar:
          avatar(oldMember, newMember, channel);
          break;
      }

      ////////////////////////
      // EMBEDS
      ////////////////////////

      function delRole(removedRole, oldMember, auditChannel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${oldMember.displayName}`,
            `${oldMember.user.displayAvatarURL({ dynamic: true })}`
          )
          .setColor("#00FF86")
          .setFooter(`ID: ${oldMember.id}`)
          .setDescription(`Role Removed: \`${removedRole}\``);
        //.setThumbnail(`${oldMember}`)
        auditChannel.send(exampleEmbed);
      }

      function addRole(addedRole, oldMember, auditChannel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${oldMember.displayName}`,
            `${oldMember.user.displayAvatarURL({ dynamic: true })}`
          )
          .setColor("#00FF86")
          .setFooter(`ID: ${oldMember.id}`)
          .setDescription(`Role Added: \`${addedRole}\``);
        //.setThumbnail(`${oldMember}`)
        auditChannel.send(exampleEmbed);
      }

      function nick(oldMember, newMember, auditChannel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${oldMember.displayName}`,
            `${oldMember.user.displayAvatarURL({ dynamic: true })}`
          )
          .setColor("#00FF86")
          .setFooter(`ID: ${oldMember.id}`)
          .setDescription(
            `Nickname Changed:\n\nOld: \`${oldMember.displayName}\` -> New: \`${newMember.displayName}\``
          );
        auditChannel.send(exampleEmbed);
      }

      function avatar(oldMember, newMember, auditChannel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${oldMember.displayName}`,
            `${oldMember.user.displayAvatarURL({ dynamic: true })}`
          )
          .setColor("#00FF86")
          .setFooter(`ID: ${oldMember.id}`)
          .setDescription(
            `pfp changed:\n\nOld: \`${oldMember.user.displayAvatarURL({
              dynamic: true,
            })}\` New: \`${newMember.user.displayAvatarURL({
              dynamic: true,
            })}\``
          );
        auditChannel.send(exampleEmbed);
      }
    });

    client.on("guildMemberRemove", async (member) => {
      if (member.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = member.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_KICK",
      });
      const kickLog = fetchedLogs.entries.first();
      if (!kickLog)
        return embed(channel, `${member.user.tag} left the guild`, member);

      // We now grab the user object of the person who kicked our member
      // Let us also grab the target of this action to double check things
      const { executor, target } = kickLog;

      // And now we can update our output with a bit more information
      // We will also run a check to make sure the log we got was for the same kicked member
      if (target.id === member.id) {
        embed(
          channel,
          `${member.user.tag} left the guild.\nKicked by ${executor.tag}?`,
          member
        ); //channel.send(`> ${member.user.tag} left the guild; kicked by ${executor.tag}? <:dead:765721212033695784>`);
      } else {
        embed(
          channel,
          `${member.user.tag} left the guild.\nAudit log fetch was inconclusive.`,
          member
        ); //channel.send(`> ${member.user.tag} left the guild, audit log fetch was inconclusive. <:dead:765721212033695784><:dead:765721212033695784><:dead:765721212033695784>`);
      }
    });

    //embed
    function embed(channel, info, member) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${member.displayName}`,
          `${member.user.displayAvatarURL({ dynamic: true })}`
        )
        .setColor(`#FF0000`)
        .setFooter(`ID: ${member.id}`)
        .setDescription(`${info}`);
      channel.send(embed);
    }

    //////////////////////////////////
    // USER LOGGING
    //////////////////////////////////

    client.on(`userUpdate`, (oldUser, newUser) => {
      const channel = oldUser.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      if (oldUser.username !== newUser.username) {
        username(oldUser, newUser, channel);
      }

      ///////////////////////
      // EMBEDS
      ///////////////////////

      function username(oldUser, newUser, auditChannel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(
            `${oldUser.username}`,
            `${oldUser.displayAvatarURL({ dynamic: true })}`
          )
          .setColor("#00FF86")
          .setFooter(`ID: ${oldUser.id}`)
          .setDescription(
            `Username Changed:\n\nOld: \`${oldUser.username}\` -> New: \`${newUser.username}\``
          );
        auditChannel.send(exampleEmbed);
      }
    });

    //////////////////////////////////
    // CHANNEL LOGGING
    //////////////////////////////////

    client.on("channelCreate", (newChannel) => {
      if (newChannel.type == "dm") return;
      if (newChannel.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = newChannel.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      addChannel(newChannel, channel);

      //////////////////
      // EMBED
      //////////////////

      function addChannel(newChannel, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Channel Updated -`)
          .setColor("#00FF86")
          .setFooter(`Channel ID: ${newChannel.id}`)
          .setDescription(`Channel Created: \`#${newChannel.name}\``);
        channel.send(exampleEmbed);
      }
    });

    client.on("channelDelete", (removedChannel) => {
      if (removedChannel.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = removedChannel.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      removeChannel(removedChannel, channel);

      //////////////////
      // EMBED
      //////////////////

      function removeChannel(removedChannel, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Channel Updated -`)
          .setColor("#00FF86")
          .setFooter(`Channel ID: ${removedChannel.id}`)
          .setDescription(`Channel Removed: \`#${removedChannel.name}\``);
        channel.send(exampleEmbed);
      }
    });

    client.on(`channelUpdate`, (oldChannel, newChannel) => {
      if (newChannel.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = oldChannel.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      if (newChannel.name !== oldChannel.name) {
        channelName(oldChannel, newChannel, channel);
      }

      if (newChannel.bitrate !== oldChannel.bitrate) {
        bitrate(oldChannel, newChannel, channel);
      }

      //////////////////
      // EMBED
      //////////////////

      function channelName(oldChannel, newChannel, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Channel Updated -`)
          .setColor("#00FF86")
          .setFooter(`Channel ID: ${newChannel.id}`)
          .setDescription(
            `Channel Name Changed:\n\nOld: \`${oldChannel.name}\` -> New: \`${newChannel.name}\``
          );
        channel.send(exampleEmbed);
      }

      function bitrate(oldChannel, newChannel, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Channel Updated -`)
          .setColor("#00FF86")
          .setFooter(`Channel ID: ${newChannel.id}`)
          .setDescription(
            `Channel Bitrate Changed:\n\nOld: \`${
              oldChannel.bitrate / 1000
            }kbps\` -> New: \`${newChannel.bitrate / 1000}kbps\``
          );
        channel.send(exampleEmbed);
      }
    });

    ////////////////////////////
    // ROLE LOGGING
    ////////////////////////////

    client.on(`roleCreate`, (newRole) => {
      if (newRole.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = newRole.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      createRole(newRole, channel);

      //////////////////
      // EMBED
      //////////////////

      function createRole(newRole, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Roles Updated -`)
          .setColor("#00FF86")
          .setFooter(`Role ID: ${newRole.id}`)
          .setDescription(`Role Created: ${newRole}`);
        channel.send(exampleEmbed);
      }
    });

    client.on(`roleDelete`, (delRole) => {
      if (delRole.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = delRole.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      deleteRole(delRole, channel);

      //////////////////
      // EMBED
      //////////////////

      function deleteRole(delRole, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Roles Updated -`)
          .setColor("#00FF86")
          .setFooter(`Role ID: ${delRole.id}`)
          .setDescription(`Role Removed: \`${delRole.name}\``);
        channel.send(exampleEmbed);
      }
    });

    client.on(`roleUpdate`, (oldRole, newRole) => {
      if (newRole.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = oldRole.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );

      if (oldRole.name !== newRole.name) {
        roleName(oldRole, newRole, channel);
      }

      //////////////////
      // EMBED
      //////////////////

      function roleName(oldRole, newRole, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Roles Updated -`)
          .setColor("#00FF86")
          .setFooter(`Role ID: ${newRole.id}`)
          .setDescription(
            `Role Name Changed:\n\nOld: \`${oldRole.name}\` -> New: \`${newRole.name}\``
          );
        channel.send(exampleEmbed);
      }
    });

    /////////////////////
    // MESSAGE LOGGING
    /////////////////////

    client.on(`messageDelete`, async (del) => {
      if (del.guild.id !== `698590629344575500`) return; // Ignore emoji servers
      if (del.author.bot) return;
      if (del.channel.type === "dm") return;

      var deletedMessage = del.content;
      const channel = del.client.channels.cache.find(
        (channel) => channel.id === `768882922379280464`
      );
      if (
        del.author.id !== `234395307759108106` &&
        del.author.id !== `765662774445080616`
      ) {
        delMsg(del, channel);
      }
    });
    //////////////////
    // EMBED
    //////////////////

    function delMsg(del, channel) {
      var delStr = del.content;
      var delFormat = delStr.replace(/\`/g, "");
      const exampleEmbed = new Discord.MessageEmbed()
        .setAuthor(`Message Updated -`)
        .setColor("#00FF86")
        .setFooter(
          `Message Author: ${del.author.tag} | In Channel: ${del.channel.name}`
        )
        .setDescription(`**Message Deleted:** \n\`\`\`${delFormat}\`\`\``);
      if (delFormat !== "") {
        channel.send(exampleEmbed);
      }
      if (del.attachments) {
        del.attachments.forEach((attachment) => {
          channel.send(
            `Image deleted from **${del.author.tag}**\n` + attachment.url
          );
        });
      }
    }

    client.on(`messageDeleteBulk`, (bulk) => {
      const channel = client.channels.cache.find(
        (channel) => channel.id === `768882922379280464`
      );

      let bulkDel = bulk.map((b) => b.content).join(`\n`); // old
      let bulkDelReversed = bulk.array().reverse();

      bulkDelEmbed(
        bulk,
        channel,
        bulkDelReversed.map((b) => b.content).join(`\n`)
      );

      ///////////////
      // EMBED
      ///////////////

      function bulkDelEmbed(bulk, channel, array) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Message Updated -`)
          .setColor("#00FF86")
          //.setFooter(`Message(s) Author: ${array.author.tag}`)
          .setDescription(
            `${bulk.size} Message(s) Deleted: \n\`\`\`${array.substr(
              0,
              1000
            )}\`\`\``
          );
        channel.send(exampleEmbed);
      }
    });

    client.on(`messageUpdate`, (oldMsg, newMsg) => {
      // if (newMsg.guild.id !== `698590629344575500`) return; // Ignore emoji servers
      //^^^^^^^^^^^^^^^^^^^^^^^^^FIX THIS LATER^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // IT DIES WHEN THE BOT DM's SOMEONE AFTER BEING GIVEN THE TEEN LEADER ROLE

      const channel = client.channels.cache.find(
        (channel) => channel.id === `768882922379280464`
      );

      if (oldMsg.content !== newMsg.content) {
        editMessage(oldMsg, newMsg, channel);
      }

      //////////////////
      // EMBED
      //////////////////

      function editMessage(oldMsg, newMsg, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Message Updated -`)
          .setColor("#00FF86")
          .setFooter(`Message ID: ${newMsg.id}`)
          //.setDescription(`Message Edited:\nIn Channel ${newMsg.channel.toString()}\nOld: \`\`\`${oldMsg.content}\`\`\` \nNew: \`\`\`${newMsg.content}\`\`\``)
          .addFields(
            {
              name: `In Channel:`,
              value: `${newMsg.channel.toString()}`,
              inline: true,
            },
            {
              name: `Message Contents:`,
              value: `Old: \`\`\`${oldMsg.content
                .replace("`", `\``)
                .replace("`", `\``)
                .replace("`", `\``)
                .replace("`", `\``)
                .replace("`", `\``)
                .replace("`", `\``)
                .replace("`", `\``)
                .replace(
                  "`",
                  `\``
                )}\`\`\` \nNew: \`\`\`${newMsg.content.replace(
                "`",
                `\``
              )}\`\`\``,
              inline: false,
            }
          );
        channel.send(exampleEmbed);
      }
    });

    //////////////////////
    // INVITE LOGGING
    //////////////////////

    client.on(`inviteCreate`, (inv) => {
      if (inv.guild.id !== `698590629344575500`) return; // Ignore emoji servers

      const channel = inv.client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      );
      createInv(inv, channel);

      //////////////////
      // EMBED
      //////////////////

      function createInv(inv, channel) {
        const exampleEmbed = new Discord.MessageEmbed()
          .setAuthor(`Invite Created -`)
          .setColor("#00FF86")
          .setFooter(`Invite Code: ${inv.code}`)
          .addFields(
            { name: `Invite URL`, value: `<${inv}>`, inline: true },
            { name: `Invite Maker:`, value: `${inv.inviter}`, inline: false },
            { name: `Max Uses:`, value: `${inv.maxUses}`, inline: true },
            { name: `Length:`, value: `${inv.maxAge}`, inline: true }
          );
        //.setDescription(`Invite Created: ${inv}`)
        channel.send(exampleEmbed);
      }
    });

    client.on(`guildMemberWarned`, (warnedMember, reason, warner) => {
      const channel = client.channels.cache.find(
        (channel) => channel.id === `759967435309842494`
      ); // #audit-log
      warnEmbed(channel, warnedMember, reason, warner);
    });

    function warnEmbed(channel, member, reason, warner) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${member.displayName}`,
          `${member.user.displayAvatarURL({ dynamic: true })}`
        )
        .setColor("#F3D40C")
        .setTitle(`Member Warned!`)
        .setDescription(`**Reason: ${reason}\nBy:** ${warner}`)
        .setFooter(`ID: ${member.id}`);
      channel.send(embed);
    }
  },
};
