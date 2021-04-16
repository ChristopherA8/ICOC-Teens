module.exports = {
  name: "done",
  execute(msg) {
    let icoc = msg.guild.roles.cache.find(
      (role) => role.id == `698634625077215372`
    );

    if (msg.member.roles.cache.has(icoc.id)) {
    } else {
      if (msg.author.id !== "778847115002642442") {
        msg.member.roles.add(icoc, `Member joined with !done`);
        msg.delete();
      }
    }
  },
};
