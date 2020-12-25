module.exports = {
    name:"buy",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');
        const fs = require('fs');

        // Create objects "member" and "shop" from the json files
        let jsonMembersData = fs.readFileSync('./commands/commerce/members.json');
        let membersObject = JSON.parse(jsonMembersData);
        var member = membersObject.members.filter(member => member.id == msg.author.id);
        member = member[0]; // Get first member from array
        let jsonShopData = fs.readFileSync('./commands/commerce/shop.json');
        let shop = JSON.parse(jsonShopData);

        var itemID = msg.content.substr(4).trim();

        if (itemID !== '') {
            if (!isNaN(itemID)) {
                for (const shopItems of shop.items) {
                    if (shopItems.id == itemID) {
                        if (Number(shopItems.price) <= Number(member.balance)) {
                            var itemToBuy = {
                                name: shopItems.name,
                                id: shopItems.id
                            }
                            msg.channel.send(`${msg.author} purchased **${shopItems.name}**`);
                            member.items.push(itemToBuy); // Add purchased item to member's items
                            member.balance -= shopItems.price;
                            let data = JSON.stringify(membersObject, null, 4); // Write to file
                            fs.writeFileSync('./commands/commerce/members.json', data);
                            return;
                        } else {
                            msg.reply(`Insufficient funds! <:danii:755949806702166108>`);
                            return;
                        }
                    } else {
                        // msg.reply(`**Error:** Item not available!`);
                        continue;
                    }
                }
            } else {
                msg.reply(`**Error:** Item ID must be whole number!`);
            }
        } else {
            msg.reply(`**Error:** Missing ItemID!`);
        }

    },
};






/*         // SQLite database
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
        } */