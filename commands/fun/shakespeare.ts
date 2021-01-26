module.exports = {
    name:"shakespeare",
    execute(msg) {

        const quotes = require('../json/shakespeare.json');
        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
        msg.channel.send(quotes[parseInt(getRandomArbitrary(0,quotes.length))]);

    },
};