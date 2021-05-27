/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/*                                                                                                                             */
/*     ICOC Teens bot! A multipurpose chat bot for Discord. Features include, moderation, sound effects, XP/Leveling, etc...   */
/*                                      Written completely in TypeScript and json!                                             */
/*                                                  Invite Link                                                                */
/*              https://discord.com/api/oauth2/authorize?client_id=761792910088994816&permissions=8&scope=bot                  */
/*                                                                                                                             */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

// Constants
const fs = require("fs");
const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const { prefix, token } = require("./config.json");
const SQLite = require("better-sqlite3");
const client = new Client({
  intents: [Intents.ALL],
});
exports.client = client;
let colors = require("colors/safe");
const sql = new SQLite("./databases/scores.sqlite");
const DisTube = require("distube");
const cron = require("node-cron");

// New DisTube instance
client.distube = new DisTube(client, {
  searchSongs: false,
  emitNewSongOnly: true,
});

// Custom Modules
const { logging } = require("./modules/logging.ts");
const { commands } = require("./modules/commandHandler.ts");
const { webserver } = require("./modules/webserver.ts");
const { welcome } = require("./modules/welcome.ts");
const { voiceEvents } = require("./modules/voiceEvents.ts");
logging(client); // Start logging
commands(client); // Add command files to collection
welcome(client); // Welcome new members
voiceEvents(client);

// Runs on ready
client.on("ready", async () => {
  const { clubReactions } = require("./modules/clubs.ts");
  await clubReactions(client, Discord); // Club Reactions

  console.log(colors.red(`Connected as ${client.user.tag}`));
  let guild = await client.guilds.cache.get("698590629344575500");
  await client.user.setActivity(`${guild.members.cache.size} members`, {
    type: "WATCHING",
  });

  /**
    SQLite XP system - https://anidiots.guide/coding-guides/sqlite-based-points-system
  **/

  // Check if the table "points" exists.
  const table = sql
    .prepare(
      "SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';"
    )
    .get();
  if (!table["count(*)"]) {
    // If the table isn't there, create it and setup the database correctly.
    sql
      .prepare(
        "CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, name TEXT);"
      )
      .run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare(
    "SELECT * FROM scores WHERE user = ? AND guild = ?"
  );
  client.setScore = sql.prepare(
    "INSERT OR REPLACE INTO scores (id, user, guild, points, level, name) VALUES (@id, @user, @guild, @points, @level, @name);"
  );

  // /* =-=-=-=-=-=-=-=-= Birthdays =-=-=-=-=-=-=-=-= */
  // const { birthdays } = require('./modules/birthdays.ts');
  // cron.schedule('0 0 */12 * * *', birthdays(client), {
  //     timezone: "America/Chicago"
  // });
  // /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
});

client.on("message", async (msg) => {
  const { reactionListener } = require("./modules/suggestionReaction.ts");
  reactionListener(msg);

  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;

  // Done command
  let name = msg.content.slice(prefix.length).split(/ +/).shift().toLowerCase();
  const accept = require("./commands/other/done.ts");
  if (name == `done`) {
    accept.execute(msg);
  }

  // KEEP SPAM OUT OF #RULES
  if (
    msg.channel.id == `770730379077353494` &&
    msg.author.id !== `329039487474860032`
  ) {
    await msg.delete();
    return;
  }

  const { loadModules } = require("./modules/modules.ts");
  loadModules(msg, client, fs, Discord, prefix);

  const fetch = require("node-fetch");
  fetch(`http://198.251.72.167:3000/users/id/${msg.author.id}`)
    .then((res) => res.text())
    .then((out) => {
      if (out == `User not found`) {
        const { execute } = require("./commands/commerce/register.ts");
        execute(msg);
      }
    });

  ///////////////////////////////////
  // Command Handler
  ///////////////////////////////////
  if (!msg.content.startsWith(prefix)) return;

  // I never use this(args) lul
  const args = msg.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);
  if (command.args && !args.length) {
    return msg.channel.send(
      `\**Error:\** You didn't provide any arguments, ${msg.author}!`
    );
  }

  try {
    if (msg.content.startsWith(`${prefix}clear`)) {
      command.execute(msg, args);
    } else if (msg.content.startsWith(`${prefix}ticket`)) {
      command.execute(msg, args);
    } else if (msg.content.startsWith(`${prefix}eval`)) {
      command.execute(msg, args);
    } else {
      // Permission system

      /**
       * 1. @\everyone
       * 2. ICOC Goat
       * 3. ICOC Champ
       * 4. Partner In Christ
       * 5. Staff
       * 6. Teen Leaders
       * 7. Admin
       * 8. Owner
       * 9. Bot Owner
       * 10. nothing, it just looks more even this way :)
       **/
      const { Permissions } = require("discord.js");
      switch (command.permissions) {
        case 1:
          command.execute(msg, args);
          break;
        case 2:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `698643225443041311` // ICOC Goat
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 3:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `776286858342170636` // ICOC Champ
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 4:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `776557333656109078` // Partner in Christ
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 5:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `698594429711417415` // Staff
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 6:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `698650459187183672` // Teen Leaders
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 7:
          if (msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            command.execute(msg, args);
            break;
          }
          return;
        case 8:
          if (
            msg.member.roles.cache.some(
              (role) => role.id == `698594265185517568` // Owner
            )
          ) {
            command.execute(msg, args);
            break;
          }
          return;
        case 9:
          if (msg.member.id == `279032930926592000`) {
            // Bot Owner :)
            command.execute(msg, args);
            break;
          }
          msg.channel.send(`You are not the bot owner`);
          return;
        case 10:
          msg.channel.send(`Access Denied: Missing Permission Level 10`);
          // command.execute(msg, args);
          break;
        default:
          command.execute(msg, args);
          break;
      }
    }
  } catch (error) {
    console.error(error);
    await msg.channel.send(`**Crashlog:** ${error}\n||<@279032930926592000>||`);
  }
});

/* =-=-=-=-=-=-=-=-=-= Slash Commands!! =-=-=-=-=-=-=-=-=-= */

const discordJsHandlers = require("./node_modules/discord.js/src/client/websocket/handlers/index");
let commandName;
let channelID;
let guildID;
discordJsHandlers.INTERACTION_CREATE = (_client, { d: packetData }) => {
  commandName = packetData.data.name;
  channelID = packetData.channel_id;
  guildID = packetData.guild_id;
  if (commandName == "frogge") {
    frogge(guildID, channelID);
  } else if (commandName == "bear") {
    bear(guildID, channelID);
  } else if (commandName == "jojo") {
    jojo(guildID, channelID);
  }
};

function frogge(guildID, channelID) {
  let guild = client.guilds.cache.find((guild) => guild.id == guildID);
  let channel = guild.channels.cache.get(channelID);
  let { giphy } = require(`./config.json`);
  let fetch = require(`node-fetch`);
  fetch(
    `https://api.giphy.com/v1/gifs/random?api_key=${giphy}&tag=frog&rating=g`
  )
    .then((res) => res.json())
    .then((api) => {
      channel.send(api.data.url);
    });
}

function bear(guildID, channelID) {
  let guild = client.guilds.cache.find((guild) => guild.id == guildID);
  let channel = guild.channels.cache.get(channelID);
  let { tenor } = require(`./config.json`);
  let fetch = require(`node-fetch`);
  fetch(
    `https://api.tenor.com/v1/random?key=${tenor}&q=cute%20bears&locale=en_US&contentfilter=medium&limit=1`
  )
    .then((res) => res.json())
    .then((api) => {
      channel.send(api.results[0].url);
    });
}

function jojo(guildID, channelID) {
  let guild = client.guilds.cache.find((guild) => guild.id == guildID);
  let channel = guild.channels.cache.get(channelID);
  let { tenor } = require(`./config.json`);
  let fetch = require(`node-fetch`);
  fetch(
    `https://api.tenor.com/v1/random?key=${tenor}&q=jojos%20bizzare%20adventure&locale=en_US&contentfilter=medium&limit=1`
  )
    .then((res) => res.json())
    .then((api) => {
      channel.send(api.results[0].url);
    });
}

/* =-=-=-=-=-=-=-=-=-= END OF Slash Commands!! =-=-=-=-=-=-=-=-=-= */

client.login(token);
