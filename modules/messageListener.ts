module.exports = {
    listen(msg) {

        if (msg.content.toLowerCase() == `f`) {
            msg.react(`🇫`);
        }

        if ((msg.content.match(/\bsimp\b/ig))) {
            msg.channel.send(`Therefore, my dear friends, flee from idolatry. - 1 Corinthians 10:14`);
        }
        
        if (msg.content.includes(`ur mom`) || (msg.content.includes(`your mom`))) {
          msg.channel.send(`airhorn airhorn airhorn`);
        }

        // /* =-=-=-= Keep Messages out of #the-dungeon =-=-=-= */
        // if (msg.channel.id == `768931736414584902`) {
        //     if ((msg.author.id !== `620438897217896459`) && (msg.author.id !== `279032930926592000`)) {
        //         msg.delete();
        //     }
        // }

    },
};