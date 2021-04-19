module.exports = {
  name: "updateCommands",
  execute(msg) {
    msg.channel.send(`Command Handler ran`);
    const { commands } = require("../../modules/commandHandler.ts");
    commands(msg.client);
  },
};
