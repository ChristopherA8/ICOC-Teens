module.exports = {
    name: "status",
    execute(msg) {

        var input = msg.content.substr(7).trim();

        switch (input) {
            case `invisible`:
                msg.client.user.setStatus('invisible');
                break;
            case `online`:
                msg.client.user.setStatus('online');
                break;
            case `dnd`:
                msg.client.user.setStatus('dnd');
                break;
            case `idle`:
                msg.client.user.setStatus('idle');
                break;
            default:
                msg.channel.send(`Status options: online, idle, dnd, invisible`);
                break;
        }

    },
};

/*
<client>.user.setStatus('online');
<client>.user.setStatus('idle');
<client>.user.setStatus('dnd');
<client>.user.setStatus('invisible');
*/