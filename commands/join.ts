module.exports = {
    name:"join",
    execute(msg) {
        //const icoc = '698634625077215372';
        let icoc = msg.guild.roles.cache.find(role => role.name === `ICOC TEENS`);
        //const channel = msg.guild.channels.cache.find(c => c.id === `698591277205422171`);

        if (msg.member.roles.cache.has(icoc.id)) {
            msg.channel.send(`**Error:** You are already a member!`);
            //msg.delete();
        } else {
            msg.member.roles.add(icoc, `Member joined with !join`);
            //channel.send(`Welcome ${msg.author} to ICOC Teens! <a:wavehi:769217908373979156>`);
            //msg.delete();
        }

    },
};