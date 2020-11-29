const Discord25664 = require(`discord.js`);
module.exports = {
    name: "game",
    execute(msg) {

        var input = msg.content.substr(5).trim();

        let url = `https://api.rawg.io/api/games?key=b9e34892707c44919b24ad29cbce52d7&search=${input}`

        const fetch = require(`node-fetch`);

        var id = ``;

        fetch(url)
        .then(res => res.json())
        .then((api) => {

            if (api.results[0] == undefined) {
                msg.channel.send(`**Error:** Invalid game!`);
            } else {
                

                //"platforms": [{ "platform": { "id": 105, "name": "GameCube", "slug": "gamecube" } }],
                var i = 0;
                var platforms = [];
                while (api.results[0].platforms[i] !== undefined) {
                    platforms[i] = api.results[0].platforms[i].platform.name
                    i++;
                }


                //Get Game ID
                id = api.results[0].id;
                var descUrl = `https://api.rawg.io/api/games/${id}`;

                fetch(descUrl)
                .then(res => res.json())
                .then((descApi) => {

                    embed(msg, api, descApi, platforms);

                });






            }

        })
        .catch(err => { throw err });

    },
};



function embed(msg, api, descApi, platforms) {
    const exampleEmbed = new Discord25664.MessageEmbed()
    .setAuthor(`${api.results[0].name}`)
    .setTitle(``)
    .setColor('#00FF86')
    .setFooter(`Rating: ${api.results[0].rating}/${api.results[0].rating_top}  |  Released: ${api.results[0].released}`)
    .setDescription(``)
    .addFields(
        { name: `Description:`, value: `${removeHTML(descApi.description).substring(0,250)}`, inline: true },
        { name: `Platforms:`, value: `${platforms.join(`\n`)}`, inline: true },
    )
    .setThumbnail(`${api.results[0].background_image}`)
    msg.channel.send(exampleEmbed);
}


function removeHTML(str) {
    return str.replace(`<p>`,``)
    .replace(`</p>`, ``)
    .replace(`<h1>`, ``)
    .replace(`<h2>`, ``)
    .replace(`<h3>`, ``)
    .replace(`</h1>`, ``)
    .replace(`</h2>`, ``)
    .replace(`</h3>`, ``)
    .replace(`<br>`, ``)
    .replace(`&#39;`, `'`)
    .replace(`<br>`, ``)
    .replace('<p>', '');
}