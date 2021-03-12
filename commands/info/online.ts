module.exports = {
    name:"online",
    execute(msg) {

        msg.guild.members.fetch().then(fetchedMembers => {
            let totalOnline = fetchedMembers.filter(member => member.presence.status !== 'offline');
            // We now have a collection with all online member objects in the totalOnline variable
            msg.channel.send(`${totalOnline.size} members are online!`)
        });

    },
};