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
                var i = 0;
                var words = [];
                while(api[i] !== undefined) {
                    words[i] = api[i].word;
                    i++;
                }
                msg.channel.send(`Words that rhyme with *${input}*\n${words.join(`\n`).substr(0,20)}`);
            }


        })
        .catch(console.error);

    },
};