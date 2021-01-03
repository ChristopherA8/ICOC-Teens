module.exports = {
	name: 'ban',
	description: '',
	execute(msg, args) {

        //Define member constant
        const member = msg.member;

        //Check member permissions
	    if (member.hasPermission('BAN_MEMBERS')) {

            //Parse message content
            var input = msg.content;
            var inputArr = input.split(' ');

            //Define pinged member constant
            const ping = msg.mentions.members.first();

            //Check for mention
            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to ban!`);
            } else if (ping.id == msg.author.id) {
                msg.channel.send(`\**Error:\** You cannot ban yourself!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not ban an Admin!`);
            } else if (inputArr[2] == undefined) {
                msg.channel.send(`${ping} has been banned`);
                ping.ban();
            } else if (inputArr[2] !== undefined) {
                var reason = input.replace(inputArr[0], '').replace(inputArr[1], '').trim();
                msg.channel.send(`${ping} has been banned for \`${reason}\``);
                ping.ban(reason);
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "ban" perms`);
        }
        



	},
};