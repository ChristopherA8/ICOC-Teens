module.exports = {
  name: "hook",
  execute(msg) {
    if (msg.author.id == `279032930926592000`) {
      var input = msg.content.substr(5);
      const Discord = require("discord.js");
      const hook = new Discord.WebhookClient(
        "785707361968062514",
        "4s-gA4MW5uQJrKBQEtQzM363wgCC-U3csT2GywxXVczWhKmJLtZ_nT0w60F9GyDPawqS"
      );
      hook.avatar =
        "https://cdn.discordapp.com/avatars/279032930926592000/5612a2328d6d0248556f0756093432ae.webp";
      hook.name = "Christopher (TX)";
      hook.send(input);
    }
    msg.delete();
  },
};
