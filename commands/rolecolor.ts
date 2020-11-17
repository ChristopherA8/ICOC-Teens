module.exports = {
    name:"rolecolor",
    execute(msg) {
        //Engineer role
        const eng = msg.guild.roles.cache.find(role => role.id === '765244241643044935');
        //Capture message input
        var input = msg.content.substr(10).trim();
        const D9876 = require('discord.js');
        
        if (msg.author.id == '358360926145085443' || msg.author.id == '279032930926592000') {
            if (input != '') {
                eng.setColor(input);
            } else {
                msg.channel.send(`Enter valid color!\nList of Valid Colors: \<https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable\>`);
            }
        } else {
            msg.channel.send(`For diesl only :smileW:`);
        }


    },
};