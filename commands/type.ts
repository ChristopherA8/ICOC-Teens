module.exports = {
    name:"type",
    execute(msg) {

        var input = msg.content.substr(5).trim();

        switch (input) {
            case `start`:
                msg.channel.startTyping();
                break;
            case `stop`:
                msg.channel.stopTyping(true);
                break;
            default:
                
                break;
        }

    },
};