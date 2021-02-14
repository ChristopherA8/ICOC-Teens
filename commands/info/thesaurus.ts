module.exports = {
    name:"thesaurus",
    execute(msg) {
        const fetch = require('node-fetch')
        const Discord = require('discord.js')

        fetch(`https://dictionaryapi.com/api/v3/references/ithesaurus/json/${msg.content.substr(11).trim()}?key=2ead5e6b-eccc-4693-8c62-ccb7f209b982`)
            .then(res => res.json())
            .then(api => {

                if (api[0] == undefined) {
                    msg.channel.send(`**Error:** Invalid Word!`);
                    return;
                }

                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Merriam-Webster Thesaurus`)
                    .setDescription(`${api[0].hwi.hw} - ${api[0].fl}`);

                for (let i = 0; i < api[0].shortdef.length; i++) {
                    embed.addField(`**${i + 1}.**`, `${api[0].shortdef[i]}`)
                }

                msg.channel.send(embed);

            })


    },
};