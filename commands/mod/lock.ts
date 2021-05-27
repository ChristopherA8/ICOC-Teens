module.exports = {
  name: "lock",
  execute(msg) {
    const { Permissions } = require("discord.js");
    if (msg.author.id !== `279032930926592000`) return; // Don't run unless it's chris

    if (msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      var input = msg.content.substr(5).trim();
      const channel = msg.client.channels.cache.find(
        (channel) => channel.name === `${input}`
      );

      if (channel == undefined) {
        msg.channel
          .overwritePermissions(
            [
              {
                id: `698634625077215372`,
                deny: ["SEND_MESSAGES"],
              },
            ],
            "lock channel"
          )
          .catch((error) => console.log(error));
      } else {
        channel
          .overwritePermissions(
            [
              {
                id: `698634625077215372`,
                deny: ["SEND_MESSAGES"],
              },
            ],
            "lock channel"
          )
          .catch((error) => console.log(error));
      }
    } else {
      msg.channel.send(`\**Error:\** You are missing "Manage Messages" perms`);
    }
  },
};
