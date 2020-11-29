const Discord343434 = require('discord.js');
module.exports = {
    name:"info",
    execute(msg) {

        //declare SQLite
        const SQLite = require('better-sqlite3');
        //include database
        const db = new SQLite('../members.sqlite');

        //mentioned user
        var input = msg.content.substr(5).trim();

        db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'info';").get();
        const user = db.prepare("SELECT * FROM info WHERE name = ?").get(input);
        //db.prepare(`INSERT INTO info (name, age, sex, grade, disciple, state, country) VALUES ("christopher", 16, "m", 11, "yes", "Texas", "USA");`).run();

		if (input === '') {
            msg.channel.send(`**Error:** Missing name!`);
		} else {
            const exampleEmbed = new Discord343434.MessageEmbed()
			.setAuthor(user.name)
			.setColor('#00FF86')
			.addFields(
                { name: 'Age:', value: user.age, inline: true},
                { name: 'Sex:', value: user.sex, inline: true},
                { name: 'Grade:', value: user.grade, inline: true},
                { name: 'Baptized:', value: user.disciple, inline: true},
                { name: 'State:', value: user.state, inline: true},
                { name: 'Country:', value: user.country, inline: true}
			)
			msg.channel.send(exampleEmbed);
		}

    },
};

//INSERT INTO info (name, age, sex, grade, disciple, state, country) VALUES (@name, @age, @sex, @grade, @disciple, @state, @country);
//const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();


/*
db.prepare("CREATE TABLE info (name TEXT PRIMARY KEY, age INTEGER, sex TEXT, grade INTEGER, disciple TEXT, state TEXT, country TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    db.prepare("CREATE UNIQUE INDEX idx_info_name ON info (name);").run();
    db.pragma("synchronous = 1");
    db.pragma("journal_mode = wal");*/