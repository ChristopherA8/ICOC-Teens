module.exports = {
    name: "unlock",
    execute(msg) {

        if (msg.member.hasPermission("MANAGE_MESSAGES")) {

        var input = msg.content.substr(7).trim();
        const channel = msg.client.channels.cache.find(channel => channel.name === `${input}`);

        if (channel == undefined) {
            msg.channel.overwritePermissions([
                {
                id: msg.guild.roles.everyone.id,
                allow: ['SEND_MESSAGES'],
                },
            ], 'unlock channel').catch(error => console.log(error));
        } else {
            channel.overwritePermissions([
                {
                id: msg.guild.roles.everyone.id,
                allow: ['SEND_MESSAGES'],
                },
            ], 'unlock channel').catch(error => console.log(error));
        }

    } else {
        msg.channel.send(`\**Error:\** You are missing "Manage Messages" perms`);
    }

},
};