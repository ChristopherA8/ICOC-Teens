module.exports = {
    name:"test",
    execute(msg) {

        msg.channel.send(`\`\`\`json\n${JSON.stringify(msg.client.commands)}\`\`\``)

    },
};