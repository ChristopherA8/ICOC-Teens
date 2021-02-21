module.exports = {
    shopMemberWatcher(msg) { /*

        const fs = require('fs');
        let jsonData = fs.readFileSync('./commands/commerce/members.json');
        let membersObject = JSON.parse(jsonData);
        if (membersObject.members.filter(mem => mem.id == msg.author.id) == "") {
          console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n| ${msg.author.tag} added to Shop Members! |\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
          var newMember = 
          {
            name: msg.author.tag,
            id: msg.author.id,
            balance: 300,
            items: []
          }
          membersObject.members.push(newMember);
          let data = JSON.stringify(membersObject, null, 4); // Write to file
          fs.writeFileSync('./commands/commerce/members.json', data);
        } */

    },
};