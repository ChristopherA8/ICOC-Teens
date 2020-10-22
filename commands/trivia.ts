module.exports = {
    name: "trivia",
    execute(msg) {

        //var url = `https://opentdb.com/api.php?amount=1&category=31&difficulty=easy&type=boolean&token=4dfaa8e46fe332a7cb41f3d700ffead9f7f59512522a24c04d026b24ac41150c`;
        //var url = `https://opentdb.com/api.php?amount=1&category=24&difficulty=hard&type=boolean&token=4dfaa8e46fe332a7cb41f3d700ffead9f7f59512522a24c04d026b24ac41150c`;
        var url = `https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=boolean&encode=url3986`;

        const fetch = require(`node-fetch`);

        fetch(url)
        .then(res => res.json())
        .then((api) => {
            var str = unescape(`${api.results[0].question}`);

            msg.channel.send(`${str}`);

        })
        .catch(err => { throw err });

    },
};