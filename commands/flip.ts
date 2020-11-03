module.exports = {
    name:"flip",
    execute(msg) {

        const fetch = require('node-fetch');
        let url = `http://flipacoinapi.com/json`;

        fetch(url)
        .then((res) => res.json())
        .then(api => {
            msg.channel.send(`**Result:** ${api}`);
        })

    },
};