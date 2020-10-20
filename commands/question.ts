module.exports = {
    name: "question",
    execute(msg) {

        var url = `https://opentdb.com/api.php?amount=1&category=31&difficulty=easy&type=boolean&token=4dfaa8e46fe332a7cb41f3d700ffead9f7f59512522a24c04d026b24ac41150c`;

        const fetch = require(`node-fetch`);
        const entities = require("entities");

        fetch(url)
        .then(res => res.json())
        .then((api) => {

        if (api.results == null) {
            msg.channel.send(`**Error:** Something Happened F`);
        } else {

            var str = entities.decodeHTML(`${api.results[0].question}`);

            msg.channel.send(`"${str}"`);
        }

        })
        .catch(err => { throw err });

    },
};