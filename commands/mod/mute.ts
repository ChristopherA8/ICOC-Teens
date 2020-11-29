module.exports = {
	name: 'mute',
	description: '',
	execute(msg, args) {

        const member = msg.member;
	    if (member.hasPermission('KICK_MEMBERS')) {

            var input = msg.content;
            var reason = input.substr('29').trim();
            const ping = msg.mentions.members.first();
            const role = msg.member.guild.roles.cache.get('759587936429277214');

            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to mute!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not mute an Admin!`);
            } else if (reason !== "") {
                msg.channel.send(`${ping} has been muted for \`${reason}\``);
                ping.roles.add(role);
            } else if (reason == "") {
                msg.channel.send(`${ping} has been muted`);
                ping.roles.add(role);
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Mute Member" perms`);
        }
        



	},
};


