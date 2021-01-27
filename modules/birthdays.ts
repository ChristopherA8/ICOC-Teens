module.exports = {
    birthdays(client) {

        const guild = client.guilds.cache.get('698590629344575500')
        let role = guild.roles.cache.get('804091722006659092')
        const { isToday } = require('../helper_functions/isToday.ts');
        const { dates } = require('../databases/birthdays.json');
        const { getMember } = require('../helper_functions/getMember.ts');
        // for (const date of dates) {
        //     if (!isToday(new Date(date))) return;
        //     console.log(`Today is a birthday`)
        // }
        for (let date in dates) {
            if (isToday(new Date(date))) {
                let birthdayBoi;
                dates[date].forEach(id => {
                    birthdayBoi = getMember(id);
                })
                console.log(`Today is a birthday so ${birthdayBoi} gets ${role}`)
                continue;
            }
            console.log(`Today is not ${date}`)
        }


    },
};