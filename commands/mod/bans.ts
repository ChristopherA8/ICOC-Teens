const Discord420 = require(`discord.js`);
module.exports = {
    name: "bans",
    execute(msg) {

        msg.guild.fetchBans()
        .then(banned => {
            let list = banned.map(ban => ban.user.tag).join('\n');
            embed(list, banned);

          })
          .catch(console.error);

        function embed(list, banned) {
            const exampleEmbed = new Discord420.MessageEmbed()
            .setAuthor(`Server Name: ${msg.guild.name}`, `${msg.guild.iconURL({ dynamic: true })}`)
            .setColor('#00FF86')
            .setTitle(`${banned.size} Banned User(s)`)
            .setFooter(`Guild ID: ${msg.guild.id}`)
            .setDescription(``)
            .addFields(
                { name: `Bans List:`, value: `${list}`}
            )
            msg.channel.send(exampleEmbed);
        }


    },
};