module.exports = {
    name:"buy",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');

        // SQLite database
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/shop.sqlite');

        // Fetch items
        msg.client.getMemberItems = sql.prepare('SELECT * FROM members WHERE id = ?');
        const shopper = msg.client.getMemberItems.get(Number(msg.author.id));
        msg.client.buyItem = sql.prepare('REPLACE INTO members (id, name, balance, owned, items) VALUES (@id, @name, @balance, @owned, @items);');
        msg.client.getMember = sql.prepare('SELECT * FROM members WHERE id = ?');
        var itemIDs = shopper.items.split(","); // Parse item id's into array from member's database entry
        msg.client.getShopItems = sql.prepare('SELECT * FROM items WHERE id = ?');

        var itemsList = [];
        for (let index = 0; index < itemIDs.length; index++) {
            const element = itemIDs[index];
            itemsList.push(msg.client.getShopItems.all(element));
        }

        // User input
        var input = msg.content.substr(4).trim();

        var member = msg.client.getMember.get(msg.author.id);

        if (input === '') {
            msg.reply(`**Error:** Missing item ID`);
        } else {
            var itemPurchased = msg.client.getShopItems.all(Number(input));
            if (member.balance < itemPurchased.price) { // 
                msg.client.getShopItems
                member.items = `${member.items},${input}`;
                msg.channel.send(`${msg.author} bought something!`);
                member.owned += 1;
                member.balance -= itemPurchased.price
                msg.client.buyItem.run(member);
            } else {
                msg.reply(`You don't have enough :/`);
            }
        }

    },
};