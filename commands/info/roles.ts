const Discord3141 = require(`discord.js`);
module.exports = {
    name: "roles",
    execute(msg) {

        let roles = '';
		msg.guild.roles.cache.map((r) => (r.name != '@everyone' ? (roles += `${r} `) : ''));

		const exampleEmbed = new Discord3141.MessageEmbed()
		.setAuthor(`Server Name: ${msg.guild.name}`, `${msg.guild.iconURL({ dynamic: true })}`)
		.setTitle(`All Server Roles:`)
        .setColor('#00FF86')
		.setFooter(`Guild ID: ${msg.guild.id}`)
        .addField('Roles:', roles ? roles : 'No roles.')
		.setThumbnail(``)
		msg.channel.send(exampleEmbed);

    },
};