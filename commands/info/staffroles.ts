module.exports = {
    name:"staffroles",
    execute(msg) {

        const { roleMembersCount } = require('../../helper_functions/roleMembersCount.ts');

        let staffRoles = [
            { name:"Bug Hunter", count:roleMembersCount("775448648229453865") },
            { name:"Gulag Gamer", count:roleMembersCount("759909786472415273") },
            { name:"Seek Discomfort", count:roleMembersCount("774117150859329586") },
            { name:"Ichiraku Chef", count:roleMembersCount("783864152606638130") },
            { name:"All Nations", count:roleMembersCount("805919361978073139") },
            { name:"Da Boiz ;)", count:roleMembersCount("776221452868648980") },
            { name:"The True Baby ;-;", count:roleMembersCount("776222027723178004") },
            { name:"Frogge Crew", count:roleMembersCount("776275846406340631") }
        ]

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Staff Roles**`);
        for (let i = 0; i < staffRoles.length; i++) {
            embed.addField(staffRoles[i].name, staffRoles[i].count, true);
        }

        msg.channel.send(embed);

    },
};