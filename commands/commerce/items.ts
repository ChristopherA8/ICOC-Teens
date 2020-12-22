module.exports = {
    name:"items",
    execute(msg) {

        // Discord Embeds
        const discord322 = require('discord.js');

        // SQLite database
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/shop.sqlite');

        // Fetch items
        msg.client.getShopItems = sql.prepare('SELECT * FROM items');
        msg.client.addShopItem = sql.prepare('INSERT INTO items (name, price) VALUES (@name, @price);');
        msg.client.delShopItem = sql.prepare('DELETE FROM items WHERE id = ?');
        const itemsList = msg.client.getShopItems.all();

        // input
        var input = msg.content.substr(6).trim();
        var flag = input.split(`-`);
        var choice = flag[1].trim();
        var name = flag[2].trim();
        var price = flag[3].trim();

        //items
        let item;
        item = {
            name: name, price: Number(price)
        }

        switch (choice) {
            case "add":
                msg.client.addShopItem.run(item);
                msg.reply('Added Item');
                break;
            case "del":
                msg.reply('Deleted Item');
                msg.client.delShopItem.run(name); // uses name becaue that happens to be the second item in the message content array even though it's looking for an id
                break;
            default:
                // msg.channel.send(`**Error:** add or del!`)
                break;
        }

    },
};