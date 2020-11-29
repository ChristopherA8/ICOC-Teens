module.exports = {
	name: 'pfp',
	description: '',
	execute(msg, args) {
		//store first ping in message
		var ping = msg.mentions.members.first();

		if (ping !== undefined) {
			// Send the user's avatar URL
			msg.channel.send(ping.user.displayAvatarURL({ dynamic: true }));
		} else {
			msg.channel.send(msg.author.displayAvatarURL({ dynamic: true }));
		}

	},
};