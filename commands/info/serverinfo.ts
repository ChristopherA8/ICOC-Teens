const Discord55 = require(`discord.js`);
module.exports = {
	name: 'serverinfo',
	description: '',
	execute(msg, args) {

		let str = `${msg.guild.createdAt}`;
		var created = /\([^)]*\)/g;
		var result = str.match(created).toString();
		var s = str.replace(result, '')

		const exampleEmbed = new Discord55.MessageEmbed()
		.setAuthor(`Server Name: ${msg.guild.name}`)
		.setTitle(`Server Info:`)
        .setColor('#00FF86')
		.setFooter(`Guild ID: ${msg.guild.id}`)
		.addFields(
			{ name: 'Member Count:', value: `${msg.guild.memberCount}`, inline: true},
			{ name: `Created At:`, value: `${s}`, inline: true},
			{ name: `Owner:`, value: `${msg.guild.owner}` },
			{ name: `Boost Lvl:`, value: `${msg.guild.premiumTier}`, inline: true },
			{ name: `Number of Boosts:`, value: `${msg.guild.premiumSubscriptionCount}`, inline: true }
		)
		.setThumbnail(`${msg.guild.iconURL({ dynamic: true })}`)
		msg.channel.send(exampleEmbed);

	},
};