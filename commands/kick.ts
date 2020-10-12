module.exports = {
	name: 'kick',
	description: '',
	execute(msg, args) {

        const member = msg.member;
	    if (member.hasPermission('KICK_MEMBERS')) {

            var input = msg.content;
            var reason = input.substr('29').trim();
            const ping = msg.mentions.members.first();

            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to kick!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not kick an Admin!`);
            } else if (reason !== "") {
                msg.channel.send(`${ping} has been kicked for \`${reason}\``);
                ping.kick();
            } else if (reason == "") {
                msg.channel.send(`${ping} has been kicked`);
                ping.kick();
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Kick" perms`);
        }
        



	},
};