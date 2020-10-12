module.exports = {
	name: 'ban',
	description: '',
	execute(msg, args) {

        const member = msg.member;
	    if (member.hasPermission('BAN_MEMBERS')) {

            var input = msg.content;
            var reason = input.substr('28').trim();
            const ping = msg.mentions.members.first();

            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to ban!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not ban an Admin!`);
            } else if (reason !== "") {
                msg.channel.send(`${ping} has been banned for \`${reason}\``);
                ping.ban();
            } else if (reason == "") {
                msg.channel.send(`${ping} has been banned`);
                ping.ban();
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Ban" perms`);
        }
        



	},
};