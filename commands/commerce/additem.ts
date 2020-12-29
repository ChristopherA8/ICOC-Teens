module.exports = {
    name:"additem",
    execute(msg) {

        const fs = require(`fs`);
        var input = msg.content.substr(8).trim().split(`"`);
        msg.channel.send(`${input}`);
        let jsonData = fs.readFileSync('./commands/commerce/shop.json');
        let shopObject = JSON.parse(jsonData);
        var newID = Number(shopObject.items[shopObject.items.length - 1].id) + 1;
        var newItem = {
            name: input[1],
            price: input[3],
            id: Number(newID), // why tho
            quantity: input[5]
        }
        shopObject.items.push(newItem);
        let shopData = JSON.stringify(shopObject, null, 4);
        fs.writeFileSync('./commands/commerce/shop.json', shopData);

    },
};