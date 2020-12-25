module.exports = {
    name:"balance",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');
        const fs = require('fs');

        let jsonData = fs.readFileSync('./commands/commerce/members.json');
        let membersObject = JSON.parse(jsonData);
        var member = membersObject.members.filter(member => member.id == msg.author.id);

        // Member Embed
        const embed = new discord323.MessageEmbed()
        .setAuthor('Balance:', msg.author.displayAvatarURL(({dynamic : true})))
        .setColor('#00FF86')
        .setDescription(`₪${member[0].balance}`);


        msg.reply(embed);

    },
};