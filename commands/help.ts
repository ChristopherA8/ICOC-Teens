const Discord2 = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Lists all commands',
	execute(msg) {
        
        var input = msg.content.substr(5).trim();

        switch (input) {
            case "":
                page1();
                break;
            case "1":
                page1();
                break;
            case "2":
                page2();
                break;
            case "3":
                page3();
                break;
            case "4":
                page4();
                break;
            default:
                page1();
          }

        function page1() {

            const exampleEmbed = new Discord2.MessageEmbed()
                .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Information:`)
                .setFooter(`page 1/4`)
                .setDescription(``)
                .addFields(
                { name: '\`!help [page]\`', value: `lists all commands`, inline: true},
                { name: `\`!about\``, value: `About the bot ._.`, inline: true},
                { name: '\`!bible <book> <chapter> <verse> [through verse2]\`', value: `fetch verse`, inline: true},
                { name: '\`!icon\`', value: `get server icon`, inline: true},
                { name: '\`!pfp\`', value: `get user profile picture`, inline: true},
                { name: '\`!serverinfo\`', value: `get server info`, inline: true},
                { name: '\`!userinfo\`', value: `get user info`, inline: true},
                { name: '\`!roles\`', value: `lists all server roles`, inline: true}
            )
            msg.channel.send(exampleEmbed);
            
        }

        function page2() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Moderation:`)
                .setFooter(`page 2/4`)
            .setDescription(``)
                .addFields(
                { name: '\`!ban <@user> [reason]\`', value: `ban user`, inline: true},
                { name: `\`!kick <@user> [reason]\``, value: `kick user`, inline: true},
                { name: '\`!clear <1-99>\`', value: `delete messages`, inline: true},
                { name: '\`!lock [channel name]\`', value: `disable "send messages" in channel`, inline: true},
                { name: '\`!unlock [channel name]\`', value: `enable "send messages" in channel`, inline: true},
                { name: '\`!mute <@user> [reason]\`', value: `mute user`, inline: true},
                { name: '\`!unmute <@user> [reason]\`', value: `unmute user`, inline: true},
                { name: '\`!tempmute <@user> <time (don\'t make this rly big or it breaks)>\`', value: `tempmute user`, inline: true},
                { name: '\`!ticket <message>\`', value: `send message to staff only channel`, inline: true}
                
            )
            msg.channel.send(exampleEmbed);

        }

        function page3() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Music:`)
                .setFooter(`page 3/4`)
            .setDescription(``)
                .addFields(
                { name: '\`!play\`', value: `plays song from youtube`, inline: true},
                { name: `\`!stop\``, value: `stops song`, inline: true},
                { name: '\`!bitrate\`', value: `fetches bitrate of channel`, inline: true},
                { name: '\`!fx <name>\`', value: `available fx: airhorn, ayesir, chottomate, easy, heyaha, hourslater, illuminati, johncena, ohh, oof, replay, ricknmorty, rickroll, wow, yeet, gay, longoof, megaoof, zawarudo, nice, gucci, letsgo`, inline: true},
            )
            msg.channel.send(exampleEmbed);

        }

        function page4() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Misc:`)
                .setFooter(`page 4/4`)
            .setDescription(``)
                .addFields(
                { name: '\`!ping <@user>\`', value: `pings user a lot`, inline: true},
                { name: `\`!off\``, value: `shutdown bot, limited to "Engineer" role`, inline: true},
                { name: `\`!annoy\``, value: `repeats what you say for 10 seconds`, inline: false},
                { name: `\`!question\``, value: `fetches a random true/false question`, inline: false}
            )
            msg.channel.send(exampleEmbed);

        }


	},
};