module.exports = {
    name:"rulesembed",
    async execute(msg) {

        const hook = require('webhook-discord')
        const Hook = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');

        let rules = [
            { name:"Rule 1", value:":speak_no_evil: Do NOT swear / cuss, including abbreviated or hinted swear words.", color:"#FF0000" },
            { name:"Rule 2", value:":see_no_evil:  If you see anything that makes you uncomfy, please let @Staff or @Teen Leaders know", color:"#ff8c00" },
            { name:"Rule 3", value:":bank:  To prevent division, please do not discuss political ideas on this server", color:"#ffe342" },
            { name:"Rule 4", value:":ocean:  Do not spam the chat", color:"#1aff00" },
            { name:"Rule 5", value:":convenience_store:  Do not advertise anything unless you have permission from a staff member unless it is ICOC related", color:"#00e1ff" },
            { name:"Rule 6", value:":oncoming_police_car:  Do not post sexual content / references or encouragement of drug usage", color:"#8247fd" },
            { name:"Rule 7", value:":no_entry_sign:  Do not post racist or any offensive content. This includes jokes about disabilities, sexism, threats, suicide, etc.", color:"#d900ff" },
            { name:"Rule 8", value:":man_running:  Do not ban or mute evade, meaning using an alternate account or ip when your main account is banned. Please realize the error of your actions and the harm that they might cause others.", color:"#8f5636" },
            { name:"Rule 9", value:":yum:   Change your server nickname to at least include your first name. We also ask that you add your last name or initial to your server nickname as well, however, this is not necessary. **Please also be mindful of your profile picture**\n", color:"#ff7700" },
            { name:"Rule 10", value:":zipper_mouth:   You can mute any text channel that you don't plan to use, but you have to mute #《bot-commands or else you'll be bombarded with notifications you don't want", color:"#ff3300" },
            { name:"Rule 11", value:":blush:   Please keep worldly behavior out of this server", color:"#f5af64" },
            { name:"Note!", value:":exclamation:   It is your responsibility to read these rules. If you are banned for breaking a rule, saying \"I didn't know\" is not a good excuse. If you have any questions, please DM a @Staff member or talk to a friend in your region", color:"#fffb00" }


        ]

        const { sleep } = require('../../helper_functions/sleep.ts')

        for (let i = 0; i < rules.length; i++) {
            await sleep(1000)
            const embed = new hook.MessageBuilder()
                .setName('Rules')
                .setTitle(rules[i].name)
                .setColor(rules[i].color)
                .setDescription(rules[i].value);
            await Hook.send(embed)
        }




        // const embed = new hook.MessageBuilder()
        //     .setName('Rules')
        //    .setAuthor('Rule 1')
        //     .setColor(`#ff0000`)
        //     .setDescription(`\nDo NOT swear / cuss, including abbreviated or hinted swear words.`);
        // await Hook.send(embed)
        //
        // await setTimeout(() => {console.log('hi')}, 1000)
        //
        // const Hook2 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed2 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#ffa500`)
        //     .setDescription(`**Rule 2**\n\nIf you see anything that makes you uncomfy, please let @Staff or @Teen Leaders know`);
        // await Hook2.send(embed2)
        //
        // await setTimeout(() => {console.log('hi')}, 2000)
        //
        // const Hook3 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed3 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#ffff00`)
        //     .setDescription(`**Rule 3**\n\nTo prevent division, please do not discuss political ideas on this server`);
        // await Hook3.send(embed3)
        //
        // await setTimeout(() => {console.log('hi')}, 3000)
        //
        // const Hook4 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed4 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#008000`)
        //     .setDescription(`**Rule 4**\n\nDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chatDo not spam the chat`);
        // await Hook4.send(embed4)
        //
        // await setTimeout(() => {console.log('hi')}, 4000)
        //
        // const Hook5 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed5 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#0000ff`)
        //     .setDescription(`**Rule 5**\n\nDo not advertise anything unless you have permission from a staff member unless it is ICOC related`);
        // await Hook5.send(embed5)
        //
        // await setTimeout(() => {console.log('hi')}, 5000)
        //
        // const Hook6 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed6 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#4b0082`)
        //     .setDescription(`**Rule 6**\n\n Do not post sexual content / references or encouragement of drug usage`);
        // await Hook6.send(embed6)
        //
        // await setTimeout(() => {console.log('hi')}, 6000)
        //
        // const Hook7 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed7 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#ee82ee`)
        //     .setDescription(`**Rule 7**\n\nDo not post racist or any offensive content. This includes jokes about disabilities, sexism, threats, suicide, etc.`);
        // await Hook7.send(embed7)
        //
        // await setTimeout(() => {console.log('hi')}, 7000)
        //
        // const Hook8 = new hook.Webhook('https://discord.com/api/webhooks/804386833232429056/T2ourdX5gpSquSOgbz2bCVMrUQmvee5GD021gObG_PG0qC1TDNdX5cJSUvDC4PQzw9Lq');
        // const embed8 = new hook.MessageBuilder()
        //     .setName('Rules')
        //     .setColor(`#ff0000`)
        //     .setDescription(`**etc...**`);
        // await Hook8.send(embed8)

    },
};