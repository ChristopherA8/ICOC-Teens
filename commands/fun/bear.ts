module.exports = {
    name:"bear",
    execute(msg) {

        const { tenor } = require(`../../config.json`);
        const fetch = require(`node-fetch`);

        fetch(`https://api.tenor.com/v1/search?key=${tenor}&q=cute%20bears&locale=en_US&contentfilter=medium&limit=1`)
        .then(res => res.json())
        .then(api => {

            msg.channel.send(api.results[0].url)

        })

    },
};