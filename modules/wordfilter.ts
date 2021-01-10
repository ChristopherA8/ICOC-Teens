module.exports = {
    filter(msg, fs, Discord) {

        if (msg.channel.id == `770730379077353494`) return;
        if (msg.author.bot) return;
        if (msg.channel.type === 'dm') return;
        
        const words = require(`../bannedWords.json`);
        const channel = msg.client.channels.cache.find(channel => channel.id === `768882922379280464`);
        const bannedWords = words.words;
        // Shifting to lowercase here allows case iNsEnSiTiViTy.
        const str = msg.content.toLowerCase().trim();
        const strArr = msg.content.toLowerCase().trim().split(" ");
        
        for (let index = 0; index < bannedWords.length; index++) {
          const ban = bannedWords[index];
          if (str.includes(ban)) {
            for (let index = 0; index < strArr.length; index++) {
              const element = strArr[index];
              if (element == ban) {
                msg.delete();
                filterEmbed(msg, channel);
                const notifier = require(`node-notifier`);
                notifier.notify({
                    title: `${msg.member.displayName} in ${msg.channel.name}`,
                    message: `${msg.content}`,
                    icon: 'C:\\Users\\chris\\Pictures\\Chr1sDev\\chr1s.png',
                    sound: false
                }); 
              }
            }
          }
        }
        
        function filterEmbed(msg, channel) {
          const embed = new Discord.MessageEmbed()
          .setAuthor(`${msg.member.displayName}`, `${msg.author.displayAvatarURL({ dynamic: true })}`)
          .setColor('#FF0000')
          .setTitle(`Filtered!!`)
          .setDescription(`**Word:** ${msg.content}`)
          .setFooter(`ID: ${msg.id}`);
          channel.send(embed);
        }

    },
};