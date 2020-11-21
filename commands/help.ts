const Discord2 = require('discord.js');
module.exports = {
	name: 'help',
	description: 'Lists all commands',
	execute(msg) {

        function millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            let seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
          }
          
        var uptime = millisToMinutesAndSeconds(msg.client.uptime);
          

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
            case "5":
                page5();
                break;
            default:
                page1();
          }

        function page1() {

            const exampleEmbed = new Discord2.MessageEmbed()
                .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Information:`)
                .setFooter(`page 1/5  |  Uptime: ${uptime}`)
                .setDescription(``)
                .addFields(
                { name: '\`!help [page]\`', value: `lists all commands`, inline: true},
                { name: `\`!about\``, value: `About the bot ._.`, inline: true},
                { name: '\`!bible <book> <chapter> <verse> [through verse2]\`', value: `fetch verse`, inline: true},
                { name: '\`!icon\`', value: `get server icon`, inline: true},
                { name: '\`!pfp [@user]\`', value: `get user profile picture`, inline: true},
                { name: '\`!serverinfo\`', value: `get server info`, inline: true},
                { name: '\`!userinfo\`', value: `get user info`, inline: true},
                { name: '\`!roles\`', value: `lists all server roles`, inline: true},
                { name: '\`!uptime\`', value: `show bot uptime in minutes and seconds`, inline: true},
                { name: '\`!online\`', value: `See how many people are online`, inline: true}
            )
            msg.channel.send(exampleEmbed);
            
        }

        function page2() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Moderation:`)
                .setFooter(`page 2/5  |  Uptime: ${uptime}`)
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
                { name: '\`!ticket <message>\`', value: `send message to staff only channel`, inline: true},
                { name: '\`!bans\`', value: `lists all banned users`, inline: true},
                { name: `\`!checklist\``, value: `do "!checklist help"`, inline: true},
                { name: `\`!convert <new file type> add attachment\``, value: `converts files POG`, inline: true},
                { name: `\`!cp\``, value: `for noah :intjallah:`, inline: true}
                
            )
            msg.channel.send(exampleEmbed);

        }

        function page3() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Music:`)
                .setFooter(`page 3/5  |  Uptime: ${uptime}`)
            .setDescription(``)
                .addFields(
                { name: '\`!play <song name>\`', value: `plays song from youtube`, inline: true},
                { name: `\`!stop\``, value: `stops song`, inline: true},
                { name: '\`!bitrate\`', value: `fetches bitrate of channel`, inline: true},
                { name: '\`!fx <name>\`', value: `available fx: airhorn, ayesir, chottomate, easy, heyaha, hourslater, illuminati, johncena, ohh, oof, replay, ricknmorty, rickroll, wow, yeet, longoof, megaoof, zawarudo, nice, gucci, letsgo, ~~ussr~~`, inline: true},
            )
            msg.channel.send(exampleEmbed);

        }

        function page4() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`Misc:`)
                .setFooter(`page 4/5  |  Uptime: ${uptime}`)
            .setDescription(``)
                .addFields(
                { name: `\`!off\``, value: `shutdown bot, limited to "Engineer" role`, inline: true},
                { name: `\`!annoy\``, value: `repeats what you say for 10 seconds`, inline: true},
                { name: `\`!trivia\``, value: `fetches a random true/false question`, inline: true},
                { name: `\`!status <status>\``, value: `changes status of bot`, inline: true},
                { name: `\`!rhyme <word>\``, value: `finds words that rhyme`, inline: true},
                { name: '\`!poll <title>-<option1>-<option2>-<time in seconds>\`', value: `example; !poll dog or cat-dog-cat-30`, inline: true},
                { name: `\`!flip\``, value: `flip a coin`, inline: true},
                { name: `\`!wiki <search>\``, value: `Search wikipedia`, inline: true},
                { name: `\`!8ball\``, value: `basically just 8ball`, inline: true},
                { name: `\`!type <start/stop>\``, value: `Bot typing indicator`, inline: true}
            )
            msg.channel.send(exampleEmbed);

        }

        function page5() {
            
            const exampleEmbed = new Discord2.MessageEmbed()
            .setAuthor(`!help`, ``)
                .setColor('#00FF86')
                .setTitle(`XP/Leveling:`)
                .setFooter(`page 5/5  |  Uptime: ${uptime}`)
            .setDescription(``)
                .addFields(
                { name: `\`!xp or !rank\``, value: `View xp and level`, inline: false},
                { name: `\`!lvlup\``, value: `For the elite and upperclass of society`, inline: false},
                { name: `\`!resetxp\``, value: `resets xp`, inline: true},
                { name: `\`!resetlvl\``, value: `resets lvl`, inline: true},
                { name: `\`!top or !lead\``, value: `Shows Leaderboard (top 10)`, inline: true},
            )
            msg.channel.send(exampleEmbed);

        }


	},
};