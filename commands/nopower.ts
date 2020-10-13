module.exports = {
    name: "nopower",
    execute(msg) {
        const role = msg.member.guild.roles.cache.get('765244241643044935');
        role.setPermissions(0);
    },
}