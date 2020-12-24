module.exports = {
    name:"frogge",
    execute(msg) {

        const { giphy } = require(`../../config.json`);
        const fetch = require(`node-fetch`);

        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphy}&tag=frog&rating=g`)
        .then(res => res.json())
        .then(api => {

            msg.channel.send(api.data.url)

        })

    },
};