module.exports = {
  async loadModules(msg, client, fs, Discord, prefix) {
    // Modules
    const { listen } = require('./messageListener.ts');
    const { shopMemberWatcher } = require('./shopMemberWatcher.ts');
    const { xpListener } = require('./score.ts');
    const { filter } = require('./wordfilter.ts');
    const { voice } = require('./voicecommands.ts');
    const { feedbackListener } = require('./feedback.ts');
    feedbackListener(msg);
    if (msg.channel.id == `803446581222309888`) return;
    listen(msg);
    shopMemberWatcher(msg);
    xpListener(msg, client);
    filter(msg, fs, Discord);
    await voice(msg, prefix);
  }
}