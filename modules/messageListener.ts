module.exports = {
  listen(msg) {
    if (
      msg.channel.id == `808749893862686770` &&
      msg.author.id !== `279032930926592000` &&
      msg.content.trim() == `420`
    ) {
      msg.delete();
    }

    if (msg.content.toLowerCase() == `f`) {
      msg.react(`🇫`);
    }

    if (msg.content.match(/\bsimp\b/gi)) {
      msg.channel.send(
        `Therefore, my dear friends, flee from idolatry. - 1 Corinthians 10:14`
      );
    }

    if (
      msg.content.toLowerCase().includes(`ur mom`) ||
      msg.content.toLowerCase().includes(`your mom`)
    ) {
      msg.channel.send(`airhorn airhorn airhorn`, { tts: false });
    }

    // /* =-=-=-= Keep Messages out of #the-dungeon =-=-=-= */
    // if (msg.channel.id == `768931736414584902`) {
    //     if ((msg.author.id !== `620438897217896459`) && (msg.author.id !== `279032930926592000`)) {
    //         msg.delete();
    //     }
    // }

    // var str = msg.content;
    // var owoFilter = new RegExp(/owo|uwu|(.) (w+|vv+) (.)|(\d)(w+|vv+)(\d)|(\d)(\s|w+|vv+)(.)|(.)(w+|vv+)(\s\d)|(?!awe|owe|owl|own|two|(?<=k)iwi|(.)(w+|vv+)(\.)|\swe|(\s(?=\w{99})))((.)(w+|vv+)((\S)\b|(\s.(?!\w{1})|\d\b|>|<|\*|\.|,|!|\\|@|#|\$|%|\^|&|\(|\)|=|\+|-|_|\||\[|\]|\{|\}|`|~|\/|;|:|'|")))|(?!)/igm);
    // if (owoFilter.test(str)) {
    //     msg.channel.send(`uwu`);
    // }

    // if( msg.channel.id !== `808749893862686770`) return;
    //
    // let count = Number(msg.content);
    //
    // if (isNaN(count)) {
    //     // msg.delete();
    // } else {
    //     msg.channel.send(count - 1)
    // }
  },
};
