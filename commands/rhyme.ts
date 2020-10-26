module.exports = {
    name:"rhyme",
    execute(msg) {
        const fetch = require(`node-fetch`);
        var input = msg.content.substr(6).trim();
        let url = `https://api.datamuse.com/words?rel_rhy=${input}`;

        fetch(url)
        .then(res => res.json())
        .then(api => {

            if (api == "") {
                msg.channel.send(`**Error:** Word Not Found!`)
            } else {
                msg.channel.send(`Words that rhyme with *${input}*:\n${api[0].word}`);
            }


        })
        .catch(console.error);

    },
};