/*
 module.exports = {
    name:"slash",
    execute(msg) {
        msg.channel.send('done');

        const { token } = require('../../config.json');

        // https://discord.com/oauth2/authorize?client_id=761792910088994816&scope=applications.commands

        const fetch = require('node-fetch');

        // var url = "https://discord.com/api/v8/applications/761792910088994816/guilds/700453406061494292/commands";
        var url = "https://discord.com/api/v8/applications/761792910088994816/guilds/698590629344575500/commands";
        // var url = "https://discord.com/api/v8/applications/761792910088994816/commands";

        // var url = "https://discord.com/api/v8/applications/761792910088994816/commands";
        // 698590629344575500 // ICOC Teens
        const json = require('./slashCommandSetup.json');

        var headers = {
            "Authorization": `Bot ${token}`,
            'Content-Type': 'application/json'
        }

        fetch(url, {
            method: "post",
            body: JSON.stringify(json),
            headers: headers,
        })
        .then(res => {
            res.json()
            console.log('slash commands updated')
        })

    },
};*/
