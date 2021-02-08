module.exports = {
    name:"rolecount",
    execute(msg) {

        const { roleMembersCount } = require('../../helper_functions/roleMembersCount.ts');

        let teenRoles = [
            { name:"ICOC TEENS", count:roleMembersCount("698634625077215372") },
            { name:"ICOC GOAT", count:roleMembersCount("698643225443041311") },
            { name:"Teachers Pet", count:roleMembersCount("778066103238787072") },
            { name:"ICOC CHAMP", count:roleMembersCount("776286858342170636") },
            { name:"Partner in Christ", count:roleMembersCount("776557333656109078") }
        ]

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Teen Roles**`);
        for (let i = 0; i < teenRoles.length; i++) {
            embed.addField(teenRoles[i].name, teenRoles[i].count, true);
        }

        msg.channel.send(embed);

    },
};