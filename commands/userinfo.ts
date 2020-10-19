const Discord20 = require(`discord.js`);
module.exports = {
	name: 'userinfo',
	description: '',
	execute(msg, args) {

		let roles = '';
		msg.member.roles.cache.map((r) => (r.name != '@everyone' ? (roles += `${r} `) : ''));
		let str = `${msg.author.createdAt}`;
		var created = /\([^)]*\)/g;
		var result = str.match(created).toString();
		var s = str.replace(result, '')


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

		
	},
};