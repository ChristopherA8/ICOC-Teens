const Discord90 = require('discord.js');

module.exports = {
    name:"wiki",
    execute(msg) {

        //Declare const 'fetch'
        const fetch = require('node-fetch');
        //save message input
        var input = msg.content.substr(5).trim();
        input = encodeURI(input);

        if(input == '') { msg.channel.send(`**Error:** Missing search query!`); return; };

        let url = `https://en.wikipedia.org/api/rest_v1/page/summary/${input}`;



        fetch(url)
        .then(res => res.json())
        .then((api) => {

            const aboutEmbed = new Discord90.MessageEmbed()
            //.setTitle(`About Anime List`)
            //.setURL(`https://chr1s.dev`)
            .setAuthor(`${api.title}`, `https://www.wikipedia.org/static/apple-touch/wikipedia.png`,api.content_urls ? api.content_urls.desktop.page : 'https://www.wikipedia.org')
            .setColor('#00FF86')
            .setDescription(`${api.extract}...`)
            .setFooter(`Page ID: ${api.pageid}`)
            .setThumbnail(api.thumbnail ? api.thumbnail.source : '')
            msg.channel.send(aboutEmbed)

        })
        .catch(err => { throw err });

    },
};