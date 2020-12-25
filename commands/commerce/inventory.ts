module.exports = {
    name:"inventory",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');
        const fs = require('fs');

        let jsonData = fs.readFileSync('./commands/commerce/members.json');
        let membersObject = JSON.parse(jsonData);
        var member = membersObject.members.filter(member => member.id == msg.author.id);

        // Member Embed
        const embed = new discord323.MessageEmbed()
        .setAuthor('Inventory:', msg.author.displayAvatarURL(({dynamic : true})))
        .setColor('#00FF86')
        .setFooter(`Total Items: ${member[0].items.length}`);
        for (const item of member[0].items) {
            embed.addFields({ name:`Name: ${item.name}`, value: `ID: ${item.id}` })
        }

        msg.reply(embed);

    },
};