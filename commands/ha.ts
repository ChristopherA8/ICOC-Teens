module.exports = {
    name:"ha",
    execute(msg) {

        msg.channel.send(`ha`);

        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha`)
        }, 500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha`)
        }, 1000);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha`)
        }, 1500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha`)
        }, 2000);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha`)
        }, 2500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha`)
        }, 3000);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha ha`)
        }, 3500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha ha ha`)
        }, 4000);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`<a:uhhzoom:770404131105931291>`)
        }, 4500);



    }
}