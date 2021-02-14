module.exports = {
    name:"8ball",
    execute(msg) {

        // msg.channel.send(`As of today all command decisions will be decided upon in the council.`);

        // msg.reply(`You really shouldn't hold any emotional significance to the answers from 8ball. It's just tired of being harassed day in and day out with the non stop spam of useless questions from people who probably have something better to be doing with their lives.\n\n And no, I won't go out with you <@577169178327253035>`);
    // msg.reply(`<:pepesad:717906783636684842> I just want a break`)

        const fetch = require(`node-fetch`);

        var input = msg.content.substr(6).trim();

        if (input !== '') {
            let params = encodeURIComponent(input);
            let uri = "https://8ball.delegator.com/magic/JSON/" + params;
            fetch(uri)
            .then(response => response.json())
            .then(json => {
                msg.channel.send(`${json.magic.answer}`);
            });
        } else {
            msg.channel.send(`**Error:** Missing input!`);
        }



    },
};