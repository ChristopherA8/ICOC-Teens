module.exports = {
	name: 'pfp',
	description: '',
	execute(msg, args) {
		// Send the user's avatar URL
		msg.channel.send(msg.author.displayAvatarURL());
	},
};