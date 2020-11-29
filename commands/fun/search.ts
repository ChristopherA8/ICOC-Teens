module.exports = {
    name:"search",
    execute(msg) {

        //Define node-fetch to get json from REST api
        const fetch = require(`node-fetch`);
        //Google API key = `AIzaSyBFznftdnF-Slh2ZQl7t5kdBKFMS-Sppgc`

        //Save user's message and get rid of `!search`
        var input = msg.content.substr(7);
        //Define api url
        let url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyBFznftdnF-Slh2ZQl7t5kdBKFMS-Sppgc&cx=017576662512468239146:omuauf_lfve&q=${input}&num=5&lr=5&alt=json`;

        fetch(url)
        .then(res => res.json())
        .then(api => {

            if (api.items == undefined) {
                msg.channel.send(`**Error:** No results!`);
            } else {
                msg.channel.send(`~~Top Result~~ oldest thing ever: ${api.items[0].link}`);
            }
            

        })
        .catch(console.error)

    },
};