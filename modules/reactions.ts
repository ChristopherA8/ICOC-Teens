// module.exports = {
//     async reactions() {

//         const { client } = require('../ICOCteen.ts');

//         const guild = await client.guilds.cache.get(`698590629344575500`);
//         const channel = await guild.channels.cache.get(`768931736414584902`);
//         const message = await channel.messages.fetch(`797583403636490290`);

//         await message.react('✨');

//         // const filter = (reaction, user) => user.id == msg.author.id;
//         const filter = (reaction, user) => user.id !== `761792910088994816` && reaction.emoji.name === `✨`;
//         const collector = message.createReactionCollector(filter);
//         collector.on('collect', async (r, user) => {
//             r.users.remove(user.id);
//             var reactionMember = message.guild.members.cache.get(user.id);
//         });

//     },
// };