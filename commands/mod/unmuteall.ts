module.exports = {
  name: "unmuteall",
  execute(msg) {
    const { Permissions } = require("discord.js");
    if (msg.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      var allMembersMinusStaff = msg.guild.members.cache.filter(
        (mem) => !mem.roles.cache.has(`698594429711417415`)
      );
      var allMembersMinusStaff = allMembersMinusStaff.array();
      for (const muted of allMembersMinusStaff) {
        muted.roles.remove(`759587936429277214`);
      }
    } else {
      msg.channel.send(`**Error:** Missing Permissions!`);
    }
  },
};
