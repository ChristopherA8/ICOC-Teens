module.exports = {
    name:"ugh",
    execute(msg) {
        if (msg.author.id == `279032930926592000`) {
            const role = msg.member.guild.roles.cache.get('698594429711417415');
            msg.member.roles.add(role, `ugh ugh ugh ugh ugh smh stoop pls`);
        } else {
            msg.channel.send(`somwthing went wong`);
        }
    },
};