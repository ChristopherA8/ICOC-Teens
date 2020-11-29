const discord788 = require("discord.js");
module.exports = {
    name:"tag",
    execute(msg) {

        //get input
        var input = msg.content.substr(4).trim();

        switch (input) {
            case "pings":
                tagEmbed(msg, `Pings`, `Pings are a way to alert people on discord. When pinged you will recieve an alert. And, a red notification bubble will appear on the server icon where you were pinged. Ping someone by typing "@username", ping everyone in a server with "@everyone", ping everyone with a certain role using "@role" and ping only those who are online with "@here". @everyone, @role and @here are based off of permissions, so if you @everyone and nobody gets pinged, double check your role permissions.`);
                break;
                case "roles":
                    tagEmbed(msg, `Roles`, `Roles are a method of organizing server members. They can be used to limit access to certain channels, and give them elevated permissions. Roles can be set to show separately in the member list. Great for clout...  <:smileW:779176924818833438>`);
                    break;
                case "ur mom":
                    tagEmbed(msg, `ur mom`, `A maternal insult, also referred to as a "Yo mama" joke, is a reference to a person's mother through the use of phrases such as "your mother" or other regional variants, frequently used to insult the target by way of their mother`);
                    break;
            default:
                tagEmbed(msg, `Available Tags`, `pings, roles`);
                break;
        }

    },
};

function tagEmbed(msg, name, desc) {
    const embed = new discord788.MessageEmbed()
    .setAuthor(`${name} -`)
    .setDescription(`${desc}`)
    .setColor('#00FF86');
    msg.channel.send(embed);
}