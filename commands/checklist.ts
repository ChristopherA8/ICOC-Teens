const Discord659 = require('discord.js');
module.exports = {
    name:"checklist",
    execute(msg) {
        /////////////////////////////////
        // POGGERS POGGERS If you are reading this, dm christopher#8888 on discord and say "why is the sky a green"
        /////////////////////////////////

        //capture input
        var input = msg.content.split(' ');

        //declare SQLite
        const SQLite = require('better-sqlite3');
        //include database
        const sql = new SQLite('./list.sqlite');
        //get list of items
        var items;

        switch (input[1]) {
            case "add":
                var item = msg.content.split(`"`);
                sql.prepare("SELECT * FROM checklist").get();
                sql.prepare("INSERT INTO checklist (item, creator, completed) VALUES (?, ?, ?);").run(item[1], msg.author.tag, "no");
                msg.channel.send(`Added item!`);
                break;
            case "check":
                var id = input[2];
                var thingz = sql.prepare("SELECT * FROM checklist WHERE id = ?").get(id);
                sql.prepare("REPLACE INTO checklist (id, item, creator, completed) VALUES (?, ?, ?, ?);").run(id, thingz.item, thingz.creator, "yes");
                msg.channel.send(`Checked item ${thingz.id}`);
                break;
            case "uncheck":
                var id = input[2];
                var thingz = sql.prepare("SELECT * FROM checklist WHERE id = ?").get(id);
                sql.prepare("REPLACE INTO checklist (id, item, creator, completed) VALUES (?, ?, ?, ?);").run(id, thingz.item, thingz.creator, "no");
                msg.channel.send(`Unchecked item ${thingz.id}`);
                break;
            case "edit":
                var id = input[2];
                var item = msg.content.split(`"`);
                var stuff = sql.prepare("SELECT * FROM checklist WHERE id = ?").get(id);
                sql.prepare("REPLACE INTO checklist (id, item, creator, completed) VALUES (?, ?, ?, ?);").run(stuff.id, item[1], stuff.creator, stuff.completed);
                msg.channel.send(`Edited item ${stuff.id}`);
                break;
            case "del":
                var id = input[2];
                sql.prepare("DELETE FROM checklist WHERE id = ?").run(id);
                msg.channel.send(`Removed item ${id}!`);
                break;
            default:
                items = sql.prepare("SELECT * FROM checklist ORDER BY id").all();
                const listEmbed = new Discord659.MessageEmbed()
                .setAuthor(`Checklist:`)
                .setColor('#00FF86')
                .setFooter(`Number of Items: ${items.length}`);
                for (const things of items) {
                    var status;
                    if (things.completed == 'yes') {
                        status = '✅';
                    } else {
                        status = '⛔';
                    }
                    listEmbed.addField(`឵Creator: ${things.creator}`, `\`\`\`${things.id}: "${things.item}" | Status: ${status}\`\`\``)
                }
                msg.channel.send(listEmbed);

                break;
        }
    }
}

////// Table creation SQLite script
/*
// Check if the table "points" exists.
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'checklist';").get();
if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE checklist (id INTEGER PRIMARY KEY, item TEXT, creator TEXT, completed TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON checklist (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
}
msg.channel.send(`table created PLS DON'T USE THIS if you're stalking this channel`);
*/