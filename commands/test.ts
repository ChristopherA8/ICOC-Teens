module.exports = {
    name:"test",
    execute(msg) {

        //msg.channel.send(`\`\`\`json\n${JSON.stringify(msg.client.commands)}\`\`\``)
        //msg.client.emit('guildMemberRemove', msg.author);
        //msg.client.emit(`typingStart`, );
        // msg.client.emit(`guildMemberWarned`);
        msg.client.emit(`ready`);

    },
};