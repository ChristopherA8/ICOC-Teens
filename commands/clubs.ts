module.exports = {
    name:"clubs",
    async execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        await msg.react(`👀`);

        // const filter = (reaction, user) => user.id == msg.author.id;
        const filter = (reaction, user) => user.id !== `761792910088994816`;
        const collector = msg.createReactionCollector(filter);
        collector.on('collect', async (r, user) => {
            r.users.remove(user.id);

            var clubName;
            switch (r.emoji.name) {
                case `👀`:
                    clubName = `Eye Club`;
                    break;
                default:
                    clubName = `Other Club`;
                    break;
            }

            msg.reply(`${msg.guild.members.cache.get(user.id)} joined ${clubName}`);
        });

    },
};