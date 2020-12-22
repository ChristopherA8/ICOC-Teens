module.exports = {
    name:"inventory",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');

        // SQLite database
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/shop.sqlite');

        // Fetch items
        msg.client.getMemberItems = sql.prepare('SELECT * FROM members WHERE id = ?');
        const shopper = msg.client.getMemberItems.get(Number(msg.author.id));
        var itemIDs = shopper.items.split(","); // Parse item id's into array from member's database entry

        // Create array of items from items table using the ids in itemIDs
        var itemsList = [];
        for (let index = 0; index < itemIDs.length; index++) {
            const element = itemIDs[index];
            msg.client.getShopItems = sql.prepare('SELECT * FROM items WHERE id = ?');
            itemsList.push(msg.client.getShopItems.all(element));
        }


        // Member Embed
        const embed = new discord323.MessageEmbed()
        .setAuthor('Inventory:', msg.author.displayAvatarURL(({dynamic : true})))
        .setColor('#00FF86');
        for (const item of itemsList) {
            embed.addFields({ name:`Name: ${item[0].name}`, value: `Price: ${item[0].price}` })
        }

        msg.reply(embed);

    },
};