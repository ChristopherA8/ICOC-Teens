module.exports = {
    name:"accept",
    execute(msg) {
        let icoc = msg.guild.roles.cache.find(role => role.name === `ICOC TEENS`);

        if (msg.member.roles.cache.has(icoc.id)) {
        } else {
            if (msg.author.id !== '778847115002642442') {
                msg.member.roles.add(icoc, `Member joined with !accept`);
                msg.delete();
            }

        }

    },
};