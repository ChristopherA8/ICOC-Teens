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
            } else if(Time == undefined){
                msg.channel.send(`**Error:** Missing time amount!`);
            } else if(Time == `1`){
                msg.channel.send(`${ping} has been muted for ${Time} minute`);
                ping.roles.add(role);
            } else if(Time > 1){
                msg.channel.send(`${ping} has been muted for ${Time} minutes`);
                ping.roles.add(role);
            }

            if (ping == undefined || Time == undefined) {
            } else {
                setTimeout(() => {
                    ping.roles.remove(role, `Temporary mute expired.`);
                    msg.channel.send(`Temporary mute expired for ${ping}`);
                }, Time * 60000); // time in ms
            }

        } else {
            msg.channel.send(`\**Error:\** You are missing "Mute Member" perms`);
        }




    },
};