const roleMembersCount = (roleID) => {
    const { client } = require('../ICOCteen.ts');
    const guild = client.guilds.cache.get('698590629344575500')
    let peopleWithRole = guild.members.cache.filter(mem => mem.roles.cache.some(role => role.id == roleID));
    return peopleWithRole.size;
}

exports.roleMembersCount = roleMembersCount;