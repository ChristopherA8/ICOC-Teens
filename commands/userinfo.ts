const Discord20 = require(`discord.js`);
module.exports = {
	name: 'userinfo',
	description: '',
	execute(msg, args) {

		var ping = msg.mentions.members.first();
		let roles = '';
		msg.member.roles.cache.map((r) => (r.name != '@everyone' ? (roles += `${r} `) : ''));
		let str = `${msg.author.createdAt}`;
		var created = /\([^)]*\)/g;
		var result = str.match(created).toString();
		var s = str.replace(result, '')

		let xroles = '';
		if (ping !== undefined) {
			ping.roles.cache.map((r) => (r.name != '@everyone' ? (xroles += `${r} `) : ''));
			var xstr = `${ping.user.createdAt}`;
			var xcreated = /\([^)]*\)/g;
			var xresult = xstr.match(xcreated).toString();
			var x = str.replace(xresult, '')
		}

		if (ping !== undefined) {
			const exampleEmbed = new Discord20.MessageEmbed()
			.setAuthor(`${ping.user.tag}`, `${ping.user.displayAvatarURL(({dynamic : true}))}`)
			.setColor('#00FF86')
			.setFooter(`ID: ${ping.id}`)
			.setDescription(`${ping}`)
			.setThumbnail(`${ping.user.displayAvatarURL(({dynamic : true}))}`)
			.addFields(
				{ name: '**Registered (Not Working atm)**', value: `${x}`, inline: true},
				{ name: `**Nickname**`, value: `${ping.displayName}`, inline: true}
			)
			.addField('Roles', xroles ? xroles : 'No roles.')
			msg.channel.send(exampleEmbed);
		} else {
			const exampleEmbed = new Discord20.MessageEmbed()
			.setAuthor(`${msg.author.tag}`, `${msg.author.displayAvatarURL(({dynamic : true}))}`)
			.setColor('#00FF86')
			.setFooter(`ID: ${msg.author.id}`)
			.setDescription(`${msg.author}`)
			.setThumbnail(`${msg.author.displayAvatarURL(({dynamic : true}))}`)
			.addFields(
				{ name: '**Registered**', value: `${s}`, inline: true},
				{ name: `**Nickname**`, value: `${msg.member.displayName}`, inline: true}
			)
			.addField('Roles', roles ? roles : 'No roles.')
			msg.channel.send(exampleEmbed);
		}


		
	},
};