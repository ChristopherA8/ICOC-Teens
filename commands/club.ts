module.exports = {
    name:"club",
    async execute(msg) {

        if (msg.author.id !== `279032930926592000`) return;

        const guild = msg.client.guilds.cache.get(`698590629344575500`);
        const channel = guild.channels.cache.get('768931736414584902');
        const message = await channel.messages.fetch(`797266443229724733`);

        await message.react(`👍`);

        // const filter = (reaction, user) => user.id == msg.author.id;
        const filter = (reaction, user) => user.id !== `761792910088994816` && reaction.emoji.name == `👍`;
        const collector = message.createReactionCollector(filter);
        collector.on('collect', async (r, user) => {
            r.users.remove(user.id);

            var reactionMember = message.guild.members.cache.get(user.id);

            var clubOne = msg.guild.channels.cache.get('797266087213269034');

            if (!clubOne.permissionOverwrites.find(mem => mem.id == reactionMember.id)) {
                clubOne.updateOverwrite(reactionMember, {
                    VIEW_CHANNEL: true
                }).catch(console.error);
            } else {
                clubOne.permissionOverwrites.get(reactionMember.id).delete();
            }

        });

    },
};