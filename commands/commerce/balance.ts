module.exports = {
    name:"balance",
    execute(msg) {

        // Discord Embeds
        const discord323 = require('discord.js');

        // SQLite database
        const SQLite = require('better-sqlite3');
        const sql = new SQLite('./databases/shop.sqlite');

        // Fetch items
        msg.client.getMemberItems = sql.prepare('SELECT * FROM members WHERE id = ?');
        const shopper = msg.client.getMemberItems.get(Number(msg.author.id));
        var balance = shopper.balance;

        // Member Embed
        const embed = new discord323.MessageEmbed()
        .setAuthor('Balance:', msg.author.displayAvatarURL(({dynamic : true})))
        .setColor('#00FF86')
        .setDescription(`₪${balance}`);


        msg.reply(embed);

    },
};