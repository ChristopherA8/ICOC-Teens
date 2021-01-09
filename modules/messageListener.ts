module.exports = {
    listen(msg) {

        if (msg.content.toLowerCase() == `f`) {
            msg.react(`🇫`);
          }

    },
};