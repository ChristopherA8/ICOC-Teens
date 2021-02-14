module.exports = {
    name:"ping",
    execute(msg) {
        msg.channel.send(`🏓 Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(msg.client.ws.ping)}ms`);
    },
};