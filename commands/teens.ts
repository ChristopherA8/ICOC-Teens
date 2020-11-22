module.exports = {
    name:"teens",
    execute(msg) {
        let icoc = msg.guild.roles.cache.find(role => role.name === `ICOC TEENS`);

        if (msg.member.roles.cache.has(icoc.id)) {
        } else {
            msg.member.roles.add(icoc, `Member joined with !te3nS`);
        }

    },
};