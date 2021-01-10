module.exports = {
    webserver(client) {

        const express = require('express');
        const colors = require('colors');
        const app = express();
      
        app.get("/", function (req, res) {
            res.send(`<body style="background-color:pink;"><h1>Member Count: ${client.guilds.cache.get('698590629344575500').members.cache.size}</h1></body>`);
        });
        app.listen(420, function () {
            console.log("Server is running on localhost:".green + "420".rainbow);
        });

    },
};