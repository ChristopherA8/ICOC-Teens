module.exports = {
    name:"inv",
    execute(msg) {

        const SQLite = require('better-sqlite3');

        const sql = new SQLite('./databases/shop.sqlite');



    },
};

//table creation


/* msg.channel.send(`table created PLS DON'T USE THIS if you're stalking this channel that would be a rip`);

// If the table isn't there, create it and setup the database correctly.
sql.prepare("CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, quantity INTEGER);").run();
// Ensure that the "id" row is always unique and indexed.
sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON items (id);").run();
sql.pragma("synchronous = 1");
sql.pragma("journal_mode = wal"); */




/* msg.channel.send(`other table created PLS DON'T USE THIS if you're stalking this channel that would be a rip`);

// If the table isn't there, create it and setup the database correctly.
sql.prepare("CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT, balance INTEGER, owned INTEGER, items TEXT);").run();
// Ensure that the "id" row is always unique and indexed.
sql.prepare("CREATE UNIQUE INDEX idx_members_id ON members (id);").run();
sql.pragma("synchronous = 1");
sql.pragma("journal_mode = wal"); */