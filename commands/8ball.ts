module.exports = {
    name:"8ball",
    execute(msg) {

        const fetch = require(`node-fetch`);

        var input = msg.content.substr(6).trim();

        if (input !== '') {
            let params = encodeURIComponent(input);
            let uri = "https://8ball.delegator.com/magic/JSON/" + params;
            fetch(uri)
            .then(response => response.json())
            .then(json => {
                msg.channel.send(`${json.magic.answer}`);
            });
        } else {
            msg.channel.send(`**Error:** Missing input!`);
        }



    },
};