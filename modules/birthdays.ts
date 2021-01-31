module.exports = {
    birthdays(client) {

        const guild = client.guilds.cache.get('698590629344575500')
        let role = guild.roles.cache.get('804091722006659092')
        const { isToday } = require('../helper_functions/isToday.ts');
        const { dates } = require('../databases/birthdays.json');
        const { getMember } = require('../helper_functions/getMember.ts');

        for (let date in dates) {
            if (isToday(new Date(date))) {
                dates[date].forEach(id => {
                    console.log(`Today is ${getMember(id).displayName}'s birthday!`)
                    getMember(id).roles.add(role);
                })
            }

            // guild.members.cache.filter(mem => mem.roles.cache.has(role.id)).forEach(boi => {
            //     if (isToday(new Date(date))) {
            //         dates[date].forEach(id => {
            //             if (boi.id !== id) {
            //                 getMember(boi.id).roles.remove(role.id);
            //             }
            //         })
            //     }
            // })

        } // end of for loop


    },
};