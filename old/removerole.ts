module.exports = {
  name: "removerole",
  description: "",
  execute(msg, args) {
    // const { Permissions } = require("discord.js");
    // //Declare Constants/Variables
    // const muted = '759587936429277214';
    // var input = msg.content;
    // var roleNameA = input.substr(12);
    // var roleName = roleNameA.trim();
    // var pingRoleNameA = roleName.split(`>`)
    // var pingRoleNameB = pingRoleNameA[1];
    // let role = msg.guild.roles.cache.find(role => role.name === `${roleName}`);
    // let ping = msg.mentions.members.first();
    // if (ping == undefined) {
    //     //Check to see if msg.author is muted
    //     if (msg.member.roles.cache.has(muted)) {
    //         msg.channel.send(`> \**Error:\** You are muted!`);
    //     } else {
    //         if (role == undefined) {
    //             msg.channel.send(`> \**Error:\** Enter a valid role! (Case Sensitive)`);
    //         } else {
    //             if (msg.member.roles.cache.has(role.id)) {
    //                 msg.member.roles.remove(role.id);
    //                 msg.channel.send(`> "\**${role.name}\**" role has been removed`);
    //             } else {
    //                 msg.channel.send(`> \**Error:\** You don't have this role!`);
    //             }
    //         }
    //     }
    // } else {
    //     var pingRoleName = pingRoleNameB.trim();
    //     let pingRole = msg.guild.roles.cache.find(role => role.name === `${pingRoleName}`);
    //     //Check to see if "ping" is muted
    //     if (ping.roles.cache.has(muted)) {
    //         msg.channel.send(`> \**Error:\** ${ping} is muted!`);
    //     } else {
    //         if (pingRole == undefined) {
    //             msg.channel.send(`> \**Error:\** Enter a valid role! (Case Sensitive)`);
    //         } else {
    //             if (ping.roles.cache.has(pingRole.id)) {
    //                 if (msg.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
    //                     ping.roles.remove(pingRole.id);
    //                     msg.channel.send(`> "\**${pingRole.name}\**" role has been removed`);
    //                 } else {
    //                     msg.channel.send(`> \**Error:\** ${msg.author} does not have permission "Manage Roles"!`);
    //                 }
    //             } else {
    //                 msg.channel.send(`> \**Error:\** ${ping} doesn't have this role!`);
    //             }
    //         }
    //     }
    // }
  },
};
