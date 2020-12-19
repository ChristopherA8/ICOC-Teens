module.exports = {
	name: 'off',
	description: '',
	execute(msg) {
	const member = msg.member;
	if (member.roles.cache.some(role => role.id === '698634225385209877')) {
		process.exit();
	}else {
		msg.channel.send(`\**Error:\** You are missing "Bot Manager" role!`);
	}
},
};