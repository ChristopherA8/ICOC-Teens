module.exports = {
    name:"addinfo",
    execute(msg) {

        //declare SQLite
        const SQLite = require('better-sqlite3');
        //include database
        const db = new SQLite('./members.sqlite');

        var input = msg.content.substr(8).trim();
        var inputArr = input.split(' ');

        if (msg.author.id !== '279032930926592000') {msg.channel.send(`Ask christopher#8888 to change your info`); return;};

        db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'info';").get();

        if ((inputArr[0] == undefined) || (inputArr[1] == undefined) || (inputArr[2] == undefined) || (inputArr[3] == undefined) || (inputArr[4] == undefined) || (inputArr[5] == undefined) || (inputArr[6] == undefined)) {
            msg.channel.send(`**Error:** Make sure to include all information!\nex. \`!addinfo name age sex grade baptized state country\` - \`!addinfo daniel 14 m 9 yes Illinois USA\``);
        } else {
            db.prepare(`INSERT INTO info VALUES(?, ?, ?, ?, ?, ?, ?);`).run(inputArr[0].toLowerCase(), inputArr[1], inputArr[2], inputArr[3], inputArr[4], inputArr[5], inputArr[6]);
            msg.channel.send(`**Added Info**`);
        }
    },
};