module.exports = {
	name: 'kick',
	description: '',
	execute(msg, args) {

        //Define member constant
        const member = msg.member;

        //Check member permissions
	    if (member.hasPermission('KICK_MEMBERS')) {

            //Parse message content
            var input = msg.content;
            var inputArr = input.split(' ');

            //Define pinged member constant
            const ping = msg.mentions.members.first();

            //Check for mention
            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to kick!`);
            } else if (ping.id == msg.author.id) {
                msg.channel.send(`\**Error:\** You cannot kick yourself!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not kick an Admin!`);
            } else if (inputArr[2] == undefined) {
                msg.channel.send(`${ping} has been kicked`);
                ping.kick();
            } else if (inputArr[2] !== undefined) {
                var reason = input.replace(inputArr[0], '').replace(inputArr[1], '').trim();
                msg.channel.send(`${ping} has been kicked for \`${reason}\``);
                ping.kick(reason);
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Kick" perms`);
        }
        



	},
};