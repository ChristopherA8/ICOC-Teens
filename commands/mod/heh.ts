module.exports = {
    name:"heh",
    execute(msg) {
        var ping = msg.mentions.members.first();

        if (msg.author.id == '279032930926592000') {
            msg.channel.send(`lul thanks for testing warns, here is admin back`)
            ping.roles.add(`766331396977066044`);
        } else {
            msg.channel.send(`smh`);
        }

    },
};