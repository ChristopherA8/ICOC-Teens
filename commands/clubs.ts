module.exports = {
    name:"clubs",
    async execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        const discord = require('discord.js');
        const embed = new discord.MessageEmbed()
        .setAuthor('React to join a club')
        .setDescription('> ⛩️ - Anime Club\n> \n> 🎨 - Art Club\n> \n> 🏃‍♂️ - Athletics Club\n> \n> 📚 - Book Club\n> \n> 🎲 - D&D Club\n> \n> 🍜 - Food Club\n> \n> 🎮 - Gaming Club\n> \n> 📺 - Movie/TV Club\n> \n> 🎼 - Music Club\n> \n> 🔨 - STEM Club\n\n**React again to leave a club**');
        msg.channel.send(embed)
        .then(msg => {
            msg.react('⛩️');
            msg.react('🎨');
            msg.react('🏃‍♂️');
            msg.react('📚');
            msg.react('🎲');
            msg.react('🍜');
            msg.react('🎮');
            msg.react('📺');
            msg.react('🎼');
            msg.react('🔨');
        });

        // await msg.react(`👀`);

        // // const filter = (reaction, user) => user.id == msg.author.id;
        // const filter = (reaction, user) => user.id !== `761792910088994816`;
        // const collector = msg.createReactionCollector(filter);
        // collector.on('collect', async (r, user) => {
        //     r.users.remove(user.id);

        //     var clubName;
        //     switch (r.emoji.name) {
        //         case `👀`:
        //             clubName = `Eye Club`;
        //             break;
        //         default:
        //             clubName = `Other Club`;
        //             break;
        //     }

        //     msg.reply(`${msg.guild.members.cache.get(user.id)} joined ${clubName}`);
        // });

    },
};