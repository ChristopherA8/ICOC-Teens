module.exports = {
    name:"slots",
    execute(msg) {

        msg.channel.send(`:clubs::diamonds::spades::hearts:`);

        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`:hearts::clubs::diamonds::spades:`)
        }, 500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`:spades::hearts::clubs::diamonds:`)
        }, 1000);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`:diamonds::spades::hearts::clubs:`)
        }, 1500);
        setTimeout(() => {
            const channelMsgs = msg.channel.messages.cache.array();
            //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
            channelMsgs[channelMsgs.length - 1].edit(`:clubs::diamonds::spades::hearts:`)
        }, 2000);
        // setTimeout(() => {
        //     const channelMsgs = msg.channel.messages.cache.array();
        //     //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
        //     channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha`)
        // }, 2500);
        // setTimeout(() => {
        //     const channelMsgs = msg.channel.messages.cache.array();
        //     //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
        //     channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha`)
        // }, 3000);
        // setTimeout(() => {
        //     const channelMsgs = msg.channel.messages.cache.array();
        //     //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
        //     channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha ha`)
        // }, 3500);
        // setTimeout(() => {
        //     const channelMsgs = msg.channel.messages.cache.array();
        //     //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
        //     channelMsgs[channelMsgs.length - 1].edit(`ha ha ha ha ha ha ha ha ha`)
        // }, 4000);
        // setTimeout(() => {
        //     const channelMsgs = msg.channel.messages.cache.array();
        //     //msg.channel.send(channelMsgs[channelMsgs.length - 1].cleanContent);
        //     channelMsgs[channelMsgs.length - 1].edit(`<a:uhhzoom:770404131105931291>`)
        // }, 4500);



    }
}