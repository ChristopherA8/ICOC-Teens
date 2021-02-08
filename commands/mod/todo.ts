const Discord662 = require('discord.js');
module.exports = {
    name:"todo",
    execute(msg) {

        if (!msg.member.roles.cache.some(role => role.id === '698594429711417415')) {
            return;
        } else {

            /////////////////////////////////
            // POGGERS POGGERS If you are reading this, dm christopher#8888 on discord and say "hi"
            /////////////////////////////////

            //capture input
            var input = msg.content.split(' ');

            //declare SQLite
            const SQLite = require('better-sqlite3');
            //include database
            const sql = new SQLite('./databases/todo.sqlite');
            //get list of items
            var items;

            switch (input[1]) {
                case "add":
                    var item = msg.content.split(`"`);
                    sql.prepare("SELECT * FROM todo").get();
                    sql.prepare("INSERT INTO todo (item, creator, completed) VALUES (?, ?, ?);").run(item[1], msg.author.tag, "no");
                    msg.channel.send(`Added item!`);
                    break;
                case "check":
                    var id = input[2];
                    var thingz = sql.prepare("SELECT * FROM todo WHERE id = ?").get(id);
                    sql.prepare("REPLACE INTO todo (id, item, creator, completed, notes) VALUES (?, ?, ?, ?, ?);").run(id, thingz.item, thingz.creator, "yes", thingz.notes);
                    msg.channel.send(`Checked item ${thingz.id}`);
                    break;
                case "uncheck":
                    var id = input[2];
                    var thingz = sql.prepare("SELECT * FROM todo WHERE id = ?").get(id);
                    sql.prepare("REPLACE INTO todo (id, item, creator, completed, notes) VALUES (?, ?, ?, ?, ?);").run(id, thingz.item, thingz.creator, "no", thingz.notes);
                    msg.channel.send(`Unchecked item ${thingz.id}`);
                    break;
                case "edit":
                    var id = input[2];
                    var item = msg.content.split(`"`);
                    var stuff = sql.prepare("SELECT * FROM todo WHERE id = ?").get(id);
                    sql.prepare("REPLACE INTO todo (id, item, creator, completed) VALUES (?, ?, ?, ?);").run(stuff.id, item[1], stuff.creator, stuff.completed);
                    msg.channel.send(`Edited item ${stuff.id}`);
                    break;
                case "del":
                    var id = input[2];
                    sql.prepare("DELETE FROM todo WHERE id = ?").run(id);
                    msg.channel.send(`Removed item ${id}!`);
                    break;
                case "note":
                    var id = input[2];
                    var stuffz = sql.prepare("SELECT * FROM todo WHERE id = ?").get(id);
                    const listEmbed2 = new Discord662.MessageEmbed()
                        .setAuthor(`todo Item:`)
                        .setColor('#00FF86')
                        .addField(`Item:\n\`\`\`${stuffz.item}\`\`\``, stuffz.notes ? `**Note:**\`\`\`${stuffz.notes}\`\`\`` : `**Note:** \`\`\`No Notes\`\`\``)
                        .setFooter(`Item Creator: ${stuffz.creator}`);
                    msg.channel.send(listEmbed2);
                    break;
                case "addnote":
                    var id = input[2];
                    var stuffz = sql.prepare("SELECT * FROM todo WHERE id = ?").get(id);
                    var itemz = msg.content.split(`"`);
                    sql.prepare("REPLACE INTO todo (id, item, creator, completed, notes) VALUES (?, ?, ?, ?, ?);").run(stuffz.id, stuffz.item, stuffz.creator, stuffz.completed, itemz[1]);
                    msg.channel.send(`Note Added!`);
                    break;
                case "help":
                    msg.channel.send(`\*\*todo Help:\*\*\`\n!todo\`\n\`!todo add "item" (don't forget the quotes)\`\n\`!todo edit "item"\`\n\`!todo check itemNumber\`\n\`!todo uncheck itemNumber\`\n\`!todo del itemNumber\`\n\`!todo note itemNumber\`\n\`!todo addnote itemNumber "note"\``);
                    break;
                default:
                    items = sql.prepare("SELECT * FROM todo ORDER BY id").all();
                    const listEmbed = new Discord662.MessageEmbed()
                        .setAuthor(`todo:`)
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
}

////// Table creation SQLite script
/*
// Check if the table "points" exists.
const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'todo';").get();
if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE todo (id INTEGER PRIMARY KEY, item TEXT, creator TEXT, completed TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON todo (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
}
msg.channel.send(`table created PLS DON'T USE THIS if you're stalking this channel`);
*/