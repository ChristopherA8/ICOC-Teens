module.exports = {
    name:"update",
    execute(msg) {

        //includes
        const { prefix, webhookURL } = require('../config.json');
        const webhook = require("webhook-discord")
        const Hook = new webhook.Webhook(webhookURL)

        // Message content
        var input = msg.content.substr(prefix.length + 6).trim();
        if (input === '') {
            msg.channel.send(`**Error:** Missing input!`);
        } else {
            const Webhook = new webhook.MessageBuilder()
            .setName('Update-chan')
            .setColor("#301934")
            .setTitle('Update!')
            .setDescription(input);
            Hook.send(Webhook).catch(err => {console.log(err)});
        }
    },
};