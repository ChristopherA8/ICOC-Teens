module.exports = {
	name: 'ping',
	description: '',
	execute(msg, args) {

        //msg.channel.send(`**NO! NO! NO! NO! NO! NO! NO! NO! NO! NO! NO! NO! NO!**`);
        //vars
        const ping = msg.mentions.members.first();

        if (ping == undefined) {
            msg.channel.send(`\**Error:\** ping someone you want to spam!`);
        } else {
            msg.channel.send(`${ping}${ping}${ping}${ping}\nI made it ping less, so hopefully my bot won't be flagged as spam <a:deadlit:770314293932458035>\nDon't abuse this lul`);
        }
	},
};