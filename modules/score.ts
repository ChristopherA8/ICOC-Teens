module.exports = {
    xpListener(msg, client) {

        //disable xp in #rules
        if (msg.channel.id == `770730379077353494`) return; // rules
        if (msg.author.bot) return;
        // if (msg.channel.id == `768931736414584902`) return; // the-dungeon
        if (msg.channel.id == `776264945800052746`) return; // Bot-commands
        if (msg.channel.id == `789315997362290730`) return; // clean-memes
        if (msg.channel.id == `768882922379280464`) return; // message-log
        if (msg.channel.id == `808749893862686770`) return; // count
	/*
        if (msg.member.roles.cache.some(role => role.id == `698650459187183672`) || msg.author.id == `689910756711727193`) {
            // console.log(`teen leader spoke`)
            return;
        }
	*/
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
        if(score.level < curLevel && msg.channel.id !== `698594785803501629`) {
            score.level++;
            msg.reply(`You've leveled up to level **${curLevel}**!`);
        }
        client.setScore.run(score);


        /* =-=-=-=-= XP Leader =-=-=-=-=-= */

        const SQLitE = require('better-sqlite3');

        // Create SQLite database
        const sqL = new SQLitE('./databases/scores.sqlite');

        const top = sqL.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 1").get("698590629344575500");
        const topMem = msg.guild.members.cache.get(top.id.substr(19));
            // .setDescription(`**${topMem.displayName}**\n**❯ XP:** ${top.points}\n**❯ Level:** ${top.level}`)

        if (!topMem.roles.cache.some(role => role.id == `808429363392806952`)) {
            topMem.roles.add(`808429363392806952`)
            msg.guild.members.cache.filter(mem => mem.roles.cache.some(role => role.id == `808429363392806952`)).forEach(member => {
                member.roles.remove(`808429363392806952`);
            })
        }

    },
};
