module.exports = {
  name: "register",
  execute(msg) {
    // This runs when a person talks who is not in the database
    const fetch = require("node-fetch");
    const body = {
      name: msg.author.username,
      id: msg.author.id,
      balance: 100,
      items: [],
    };

    fetch("http://198.251.72.167:3000/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.text())
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  },
};
