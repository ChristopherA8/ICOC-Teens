module.exports = {
    name:"shop",
    execute(msg) {

        // Discord Embeds
        const discord322 = require('discord.js');

        // SQLite database
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/shop.sqlite');

        // Fetch items
        msg.client.getShopItems = sql.prepare('SELECT * FROM items DESC');
        const itemsList = msg.client.getShopItems.all();

        // Shop Embed
        const embed = new discord322.MessageEmbed()
        .setAuthor('Shop:')
        .setColor('#00FF86');
        for (const item of itemsList) {
            embed.addFields({ name:`Name: ${item.name}`, value: `Price: ₪${item.price}  |  ID: ${item.id}` })
        }

        msg.reply(embed);

    },
};