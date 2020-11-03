module.exports = {
    name: "engineer",
    execute(msg) {
        if (msg.author.id == `279032930926592000` || msg.author.id == `493159317630091285`) {
            const role = msg.member.guild.roles.cache.get('765244241643044935');
            msg.member.roles.add(role, `Testing purposes only!! wink wink`);
        } else {
            msg.channel.send(`HAH you thought`);
        }
    },
};