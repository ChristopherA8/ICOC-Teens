module.exports = {
    stats(msg, Discord, fs, prefix) {

        // if (!msg.content.startsWith(`${prefix}stats`)) return;

        let data = fs.readFileSync(`./stats.json`);
        var object = JSON.parse(data);

        // var channels = [];
        // var textChannels = msg.guild.channels.cache.filter(channel => channel.type == `text`);
        // textChannels.forEach(channel => { 
        //     // var newChannel = {
        //     //     name: channel.name,
        //     //     id: channel.id,
        //     //     messages: 0
        //     // }    
        //     // channels.push(newChannel)
        // });
        // channels.forEach(element => {
        //     object.stats.push(element);
        // });

        object.stats.forEach(channel => {
            if (channel.id == msg.channel.id) {
                channel.messages++;
            }
        });

        fs.writeFileSync(`./stats.json`, JSON.stringify(object, null, 4));

        // if (msg.content.startsWith(`${prefix}stats`)) {
        //     const embed = new Discord.MessageEmbed()
        //     .setTitle('Channel Stats');

        // }

    }
}