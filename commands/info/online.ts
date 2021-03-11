module.exports = {
    name:"online",
    execute(msg) {

        msg.guild.members.fetch().then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => (member.presence.status === 'online') && (member.presence.status === 'idle') && (member.presence.status === 'dnd'));

            // We now have a collection with all online member objects in the totalOnline variable
            msg.channel.send(`${totalOnline.size} members are online!`)
        });

    },
};