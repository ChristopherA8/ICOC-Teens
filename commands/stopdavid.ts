module.exports = {
    name: "stopdavid",
    execute(msg) {
        const mute = msg.member.guild.roles.cache.get('759587936429277214');
        if (msg.author.id == `279032930926592000`) {
            msg.channel.send(`David abusing power again lol`);
            msg.member.roles.remove(mute);
        } else {
            msg.channel.send(`angy tutle caught you cheating, you will be muted now\n${msg.author} is muted for 1 minute`);
            msg.member.roles.add(mute);
            setTimeout(() => {
                msg.channel.send(`Temporary mute expired for ${msg.author}`);
                msg.member.roles.remove(mute);
            }, 1 * 60000);
        }

    },
};