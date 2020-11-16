module.exports = {
    name:"endthepain",
    execute(msg) {

        msg.channel.send(`${msg.author} ended the pain`);
        msg.member.kick();

    },
};