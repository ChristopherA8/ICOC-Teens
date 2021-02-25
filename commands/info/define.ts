module.exports = {
    name:"define",
    execute(msg) {
        const fetch = require('node-fetch')
        const Discord = require('discord.js')

        fetch(`https://dictionaryapi.com/api/v3/references/sd3/json/${msg.content.substr(11).trim()}?key=7dd51e54-47c6-414a-aef8-3e119551589c`)
            .then(res => res.json())
            .then(api => {

                if (api[0] == undefined) {
                    msg.channel.send(`**Error:** Invalid Word!`);
                    return;
                }

                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Merriam-Webster Dictionary`)
                    .setDescription(`${api[0].hwi.hw} - ${api[0].fl}`);

                for (let i = 0; i < api[0].shortdef.length; i++) {
                    embed.addField(`**${i + 1}.**`, `${api[0].shortdef[i]}`)
                }

                msg.channel.send(embed);
                
            })


    },
};