module.exports = {
    name:"role",
    async execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        const guild = client.guilds.cache.get(`698590629344575500`);
        const message = await guild.channel.messages.fetch(`795191792550281226`);

        await message.react(`🐸`);

        // const filter = (reaction, user) => user.id == msg.author.id;
        const filter = (reaction, user) => user.id !== `761792910088994816`;
        const collector = message.createReactionCollector(filter);
        collector.on('collect', async (r, user) => {
            r.users.remove(user.id);

            var roleGang;
            switch (r.emoji.name) {
                case `🐸`:
                    roleGang = `frogge gang`;
                    break;
                default:
                    roleGang = `bruh`;
                    break;
            }

            var reactionMember = message.guild.members.cache.get(user.id);
            reactionMember.roles.add(`776275846406340631`);
            message.reply(`${reactionMember} is now ${roleGang}`);

        });

    },
};