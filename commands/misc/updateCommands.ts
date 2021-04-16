module.exports = {
  name: "updateCommands",
  execute(msg) {
    const { commands } = require("../../modules/commandHandler.ts");
    commands(msg.client);
    msg.channel.send(`Command Handler ran`);
  },
};
