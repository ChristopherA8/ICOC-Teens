module.exports = {
	name: 'off',
	description: '',
	execute(msg) {
	const member = msg.member;
	if (member.roles.cache.some(role => role.name === 'Engineer')) {
		process.exit();
	}else {
		msg.channel.send(`\**Error:\** You are missing "Engineer" role!`);
	}
},
};