module.exports = {
    name:"nick",
    execute(msg) {

        var input = msg.content.substr(5).split(`"`);
        var ping = msg.mentions.members.first();

        if (ping !== undefined) {
            if (input[1] == undefined) {
                msg.channel.send(`**Format Error:** "!nick @ping "new nickname" <-- don't forget quotes!"`);
            } else {
                ping.setNickname(input[1]);
            }
        } else {
            msg.channel.send(`**Error:** Missing Ping!`);
        }
    
    },
};