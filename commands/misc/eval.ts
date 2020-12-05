module.exports = {
    name:"eval",
    execute(msg) {

        const { prefix } = require('../../config.json');
        const discordfff = require('discord.js');

        //save input
        var input = msg.content.substr(prefix.length + 4).trim();

        if (msg.author.id == '279032930926592000') {
            const embed = new discordfff.MessageEmbed()
            .setAuthor('Evaluated JavaScript')
            .setColor('#00FF86')
            .addFields(
                { name:"Input:", value:`\`\`\`${input}\`\`\`` },
                { name:"Output:", value:`\`\`\`js\n${eval(input)}\`\`\`` }
            )
            msg.channel.send(embed)
            //msg.channel.send(`\`\`\`${eval(input)}\`\`\``, { split: true });
        } else {
            msg.channel.send(`**Error:** Missing Perms!`);
        }


    },
};