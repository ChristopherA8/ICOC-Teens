module.exports = {
  name: "users",
  permissions: 9,
  execute(msg) {
    const fetch = require("node-fetch");
    fetch("http://198.251.72.167:3000/users")
      .then((res) => res.json())
      .then((out) => {
        let users = out.users;
        msg.author.send(JSON.stringify(users, null, 2), {
          code: "json",
          split: true,
        });
      });
    msg.channel.send(`DM sent`);
  },
};
