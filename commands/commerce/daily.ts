module.exports = {
    name: "daily",
    execute(msg) {

        let date = new Date();
        const fs = require('fs');
        var jsonLimitData = fs.readFileSync(`./commands/commerce/limit.json`);
        let limitObject = JSON.parse(jsonLimitData);

        var oneDay = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);

        if (limitObject.members.find(mem => mem.id == msg.author.id)) {
            var limitMember = limitObject.members.filter(mem => mem.id == msg.author.id);
            limitMember = limitMember[0];

            if (oneDay > limitMember.timeLastRun) {
                msg.channel.send(`Daily Prize claimed!`);
                /* =-=-=-= Update Time Last Run =-=-=-= */
                limitMember.timeLastRun = date.getTime();
                /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
    
                /* =-=-=-= Change Balance =-=-=-= */
                let jsonData = fs.readFileSync('./commands/commerce/members.json');
                let membersObject = JSON.parse(jsonData);
                var member = membersObject.members.filter(member => member.id == msg.author.id);
                member = member[0];
                member.balance += 20;
                let memberData = JSON.stringify(membersObject, null, 4);
                fs.writeFileSync('./commands/commerce/members.json', memberData);
                /* =-=-=-=--=-=-=-=-=-=-=-=-=-=-= */
            } else {
                msg.channel.send(`Please wait 24 hours!`);
            }


        } else {
            msg.channel.send(`\`Member Not Found\``)
            .then(msg => {
                setTimeout(() => {msg.edit(`\`Creating New Member\``)}, 1000);
                setTimeout(() => {msg.edit(`\`New Member created!\``)}, 2500);
            })
            var newLimit = {
                id: msg.author.id,
                timeLastRun: date.getTime()
            }
            limitObject.members.push(newLimit)
        }

        let limitData = JSON.stringify(limitObject, null, 4);
        fs.writeFileSync(`./commands/commerce/limit.json`, limitData);

    },
};