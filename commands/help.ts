const Discord2 = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Lists all commands',
	execute(msg) {
        
        const exampleEmbed = new Discord2.MessageEmbed()
        .setColor('#00FF86')
        .setTitle('Command List:')
        .setFooter('')
        .setDescription('This is not done\nPing christopher#8888 to remind him\nthat he is procrastinating')
        //.addFields(
        //    { name: '**1.** r!pfp - to get link for profile picture\n**2.** r!icon - gets server icon\n**3.** r!server-info\n**4.** r!user-info', value: 'page 1/1'}
        //)
        msg.channel.send(exampleEmbed);

	},
};