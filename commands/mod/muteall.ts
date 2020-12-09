module.exports = {
    name:"muteall",
    execute(msg) {

        if (msg.member.hasPermission('KICK_MEMBERS')) {
            var allMembersMinusStaff = msg.guild.members.cache.filter(mem => !mem.roles.cache.has(`698594429711417415`));
            var allMembersMinusStaff = allMembersMinusStaff.array();
            for(const muted of allMembersMinusStaff) {
                muted.roles.add(`759587936429277214`);
            }
        } else {
            msg.channel.send(`**Error:** Missing Permissions!`);
        }

    },
};