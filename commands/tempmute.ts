module.exports = {
    name: "tempmute",
    execute(msg) {

        const member = msg.member;
	    if (member.hasPermission('KICK_MEMBERS')) {

            var input = msg.content;
            const ping = msg.mentions.members.first();
            const time = input.split(' ');
            //Emilio, if you see this comment. Ping me lol
            const Time = time[2];
            const role = msg.member.guild.roles.cache.get('759587936429277214');

            if (ping == undefined) {
                msg.channel.send(`\**Error:\** Ping the person you want to mute!`);
            } else if (ping.hasPermission('ADMINISTRATOR')) {
                msg.channel.send(`\**Error:\** You can not mute an Admin!`);
            //} else if (reason !== "") {
            //    msg.channel.send(`${ping} has been muted for \`${reason}\``);
            //    ping.roles.add(role);
            //} else if (reason == "") {
            //    msg.channel.send(`${ping} has been muted`);
            //    ping.roles.add(role);
            //}
            } else if(Time == `1`){
                msg.channel.send(`${ping} has been muted for ${Time}minute`);
                msg.channel.send(`Time = "${Time}"\ntime = "${time}"`);
                ping.roles.add(role);
            } else if(Time > 1){
                msg.channel.send(`${ping} has been muted for ${Time}minutes`);
                msg.channel.send(`Time = "${Time}"\ntime = "${time}"`);
                ping.roles.add(role);
            }

            setTimeout(() => {
                ping.roles.remove(role, `Temporary mute expired.`);
            }, Time * 60000); // time in ms

        } else {
            msg.channel.send(`\**Error:\** You are missing "Mute Member" perms`);
        }




    },
};