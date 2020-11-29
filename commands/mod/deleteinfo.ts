module.exports = {
    name:"delinfo",
    execute(msg) {

        //declare SQLite
        const SQLite = require('better-sqlite3');
        //include database
        const db = new SQLite('./databases/members.sqlite');

        var input = msg.content.substr(8).trim();

        if (msg.author.id !== '279032930926592000') {msg.channel.send(`Ask christopher#8888 to change your info`); return;};

        db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'info';").get();

        if ((input === '')) {
            msg.channel.send(`**Error:** Missing name!`);
        } else {
            db.prepare(`DELETE FROM info WHERE name = ?`).run(input);
            msg.channel.send(`**Info Deleted**`);
        }

    
    },
};