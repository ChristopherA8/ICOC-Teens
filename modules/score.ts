module.exports = {
    xpListener(msg, client) {

        //disable xp in #rules
        if (msg.channel.id == `770730379077353494`) return; // rules
        if (msg.author.bot) return;
        // if (msg.channel.id == `768931736414584902`) return; // the-dungeon
        if (msg.channel.id == `776264945800052746`) return; // Bot-commands
        if (msg.channel.id == `768882922379280464`) return; // message-log

        let score;
        score = client.getScore.get(msg.author.id, "698590629344575500");
    
        if (!score) {
            score = { id: `${msg.guild.id}-${msg.author.id}`, user: msg.author.id, guild: msg.guild.id, points: 0, level: 1, name: msg.author.tag}
        }
        if (!score.name) {
            score.name = msg.author.tag;
        }
        function getXP() {
        var words = msg.content.split(" ");
        var wordCount = words.length;
        if (wordCount <= 25) {
            score.points += wordCount;
        } else {
            score.points += 25;
        }
        // score.points++;
        client.setScore.run(score);
        }
        setTimeout(getXP, 6000);
        // getXP();
    
        const curLevel = Math.floor(0.3 * Math.sqrt(score.points));
        if(score.level < curLevel) {
        score.level++;
        msg.reply(`You've leveled up to level **${curLevel}**!`);
        }
        client.setScore.run(score);

    },
};