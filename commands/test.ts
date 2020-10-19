module.exports = {
    name: "test",
    execute(msg) {
        msg.channel.send(`${msg.author.username}`);
    }
}