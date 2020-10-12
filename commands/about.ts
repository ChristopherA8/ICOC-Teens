const Discord1 = require('discord.js');
module.exports = {
    name: 'about',
    description: '',
    execute(msg, args) {

        const aboutEmbed = new Discord1.MessageEmbed()
        .setTitle(`About ICOC Teens`)
        .setURL(`https://chr1s.dev`)
        .setAuthor("About!", `https://chr1s.dev/assets/icocspooky.png`,"https://chr1s.dev")
        .setColor('#02f2ce')
        .setDescription(`\**ICOC Teens\** is an all-purpose discord bot for the discord server "ICOC Teens". It's main purpose is moderation and music. But, it also includes other miscellaneous commands for obtaining information. Such as member profile link and guild member count.`)
        .setFooter(`Developer: Chr1sDev (christopher#8888)`, `https://chr1s.dev/assets/verified_dev.png`)
        .setThumbnail(`https://chr1s.dev/assets/icocspooky.png`)
        msg.channel.send(aboutEmbed)

    },
}