module.exports = {
    birthdays(client) {

        const { isToday } = require('../helper_functions/isToday.ts');
        let rightNow = Date.now()
        const today = isToday(rightNow)
        if (today) {
            console.log(`it's today`)
        } else {
            console.log(`it's not today`)
        }

    },
};