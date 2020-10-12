module.exports = {
	name: 'ping',
	description: '',
	execute(msg, args) {
        //vars
        const ping = msg.mentions.members.first();

        if (ping == undefined) {
            msg.channel.send(`\**Error:\** ping someone you want to spam!`);
        } else {
            msg.channel.send(`${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}${ping}`);
        }
	},
};