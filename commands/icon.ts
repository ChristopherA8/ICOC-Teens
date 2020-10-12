module.exports = {
	name: 'icon',
	description: '',
	execute(msg, args) {
        msg.channel.send(msg.guild.iconURL());
	},
};