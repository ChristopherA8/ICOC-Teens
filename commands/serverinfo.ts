module.exports = {
	name: 'serverinfo',
	description: '',
	execute(msg, args) {
        msg.channel.send(`**Server name:** ${msg.guild.name}\n**Total members:** ${msg.guild.memberCount}`);
	},
};