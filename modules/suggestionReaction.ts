module.exports = {
  reactionListener(msg) {
    if (msg.channel.type === `dm`) return;
    if (msg.channel.id !== `803323220853915679`) return;
    if (!msg.author.bot) return;
    msg.react("✅");
    const filter = (reaction, user) =>
      reaction.emoji.name === "✅" && user.bot == false;
    // msg
    //   .awaitReactions(filter, { time: 10000, maxEmojis: 3 })
    //   .then((collected) => {
    //     if (collected.size == 3) {
    //       let channel = msg.guild.channels.cache.get("837126068564525106");
    //       channel.send(
    //         `**TEST**\nMessage: ${msg.content}\nwas a legit suggestion :)`
    //       );
    //       return;
    //     }
    //     console.log(`Collected ${collected.size} reactions`);
    //   })
    //   .catch(console.error);

    const collector = msg.createReactionCollector(filter, { maxUsers: 3 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      let channel = msg.guild.channels.cache.get("837126068564525106");
      channel.send(msg.embeds[0]);
      console.log(`Collected ${collected.size} reactions`);
      console.log(`Collected ${collected.size} items`);
    });
  },
};
