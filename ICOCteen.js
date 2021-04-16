/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
/*                                                                                                                             */
/*     ICOC Teens bot! A multipurpose chat bot for Discord. Features include, moderation, sound effects, XP/Leveling, etc...   */
/*                                      Written completely in TypeScript and json!                                             */
/*                                                  Invite Link                                                                */
/*              https://discord.com/api/oauth2/authorize?client_id=761792910088994816&permissions=8&scope=bot                  */
/*                                                                                                                             */
/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Constants
var fs = require("fs");
var Discord = require("discord.js");
var _a = require("./config.json"), prefix = _a.prefix, token = _a.token;
var SQLite = require("better-sqlite3");
var client = new Discord.Client();
exports.client = client;
var colors = require("colors/safe");
var sql = new SQLite("./databases/scores.sqlite");
var DisTube = require("distube");
var cron = require("node-cron");
// New DisTube instance
client.distube = new DisTube(client, {
    searchSongs: false,
    emitNewSongOnly: true
});
// Custom Modules
var logging = require("./modules/logging.ts").logging;
var commands = require("./modules/commandHandler.ts").commands;
var webserver = require("./modules/webserver.ts").webserver;
var welcome = require("./modules/welcome.ts").welcome;
var voiceEvents = require("./modules/voiceEvents.ts").voiceEvents;
logging(client); // Start logging
commands(client); // Add command files to collection
welcome(client); // Welcome new members
voiceEvents(client);
// Runs on ready
client.on("ready", function () { return __awaiter(_this, void 0, void 0, function () {
    var clubReactions, guild, table;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clubReactions = require("./modules/clubs.ts").clubReactions;
                return [4 /*yield*/, clubReactions(client, Discord)];
            case 1:
                _a.sent(); // Club Reactions
                console.log(colors.red("Connected as " + client.user.tag));
                return [4 /*yield*/, client.guilds.cache.get("698590629344575500")];
            case 2:
                guild = _a.sent();
                return [4 /*yield*/, client.user.setActivity(guild.members.cache.size + " members", {
                        type: "WATCHING"
                    })];
            case 3:
                _a.sent();
                table = sql
                    .prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';")
                    .get();
                if (!table["count(*)"]) {
                    // If the table isn't there, create it and setup the database correctly.
                    sql
                        .prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER, name TEXT);")
                        .run();
                    // Ensure that the "id" row is always unique and indexed.
                    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
                    sql.pragma("synchronous = 1");
                    sql.pragma("journal_mode = wal");
                }
                // And then we have two prepared statements to get and set the score data.
                client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
                client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level, name) VALUES (@id, @user, @guild, @points, @level, @name);");
                return [2 /*return*/];
        }
    });
}); });
client.on("message", function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var name, accept, loadModules, args, commandName, command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (msg.channel.type === "dm")
                    return [2 /*return*/];
                if (msg.author.bot)
                    return [2 /*return*/];
                name = msg.content.slice(prefix.length).split(/ +/).shift().toLowerCase();
                accept = require("./commands/other/done.ts");
                if (name == "done") {
                    accept.execute(msg);
                }
                if (!(msg.channel.id == "770730379077353494" &&
                    msg.author.id !== "329039487474860032")) return [3 /*break*/, 2];
                return [4 /*yield*/, msg["delete"]()];
            case 1:
                _a.sent();
                return [2 /*return*/];
            case 2:
                loadModules = require("./modules/modules.ts").loadModules;
                loadModules(msg, client, fs, Discord, prefix);
                ///////////////////////////////////
                // Command Handler
                ///////////////////////////////////
                if (!msg.content.startsWith(prefix))
                    return [2 /*return*/];
                args = msg.content.slice(prefix.length).split(/ +/);
                commandName = args.shift().toLowerCase();
                if (!client.commands.has(commandName))
                    return [2 /*return*/];
                command = client.commands.get(commandName);
                if (command.args && !args.length) {
                    return [2 /*return*/, msg.channel.send("**Error:** You didn't provide any arguments, " + msg.author + "!")];
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 4, , 6]);
                if (msg.content.startsWith(prefix + "clear")) {
                    command.execute(msg, args);
                }
                else if (msg.content.startsWith(prefix + "ticket")) {
                    command.execute(msg, args);
                }
                else if (msg.content.startsWith(prefix + "eval")) {
                    command.execute(msg, args);
                }
                else {
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
                    switch (command.permissions) {
                        case 1:
                            command.execute(msg, args);
                            break;
                        case 2:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "698643225443041311"; } // ICOC Goat
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 3:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "776286858342170636"; } // ICOC Champ
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 4:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "776557333656109078"; } // Partner in Christ
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 5:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "698594429711417415"; } // Staff
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 6:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "698650459187183672"; } // Teen Leaders
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 7:
                            if (msg.member.hasPermission("ADMINISTRATOR")) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 8:
                            if (msg.member.roles.cache.some(function (role) { return role.id == "698594265185517568"; } // Owner
                            )) {
                                command.execute(msg, args);
                                break;
                            }
                            return [2 /*return*/];
                        case 9:
                            if (msg.member.id == "279032930926592000") {
                                // Bot Owner :)
                                command.execute(msg, args);
                                break;
                            }
                            msg.channel.send("You are not the bot owner");
                            return [2 /*return*/];
                        case 10:
                            msg.channel.send("Access Denied: Missing Permission Level 10");
                            // command.execute(msg, args);
                            break;
                        default:
                            command.execute(msg, args);
                            break;
                    }
                }
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [4 /*yield*/, msg.channel.send("**Crashlog:** " + error_1 + "\n||<@279032930926592000>||")];
            case 5:
                _a.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/* =-=-=-=-=-=-=-=-=-= Slash Commands!! =-=-=-=-=-=-=-=-=-= */
var discordJsHandlers = require("./node_modules/discord.js/src/client/websocket/handlers/index");
var commandName;
var channelID;
var guildID;
discordJsHandlers.INTERACTION_CREATE = function (_client, _a) {
    var packetData = _a.d;
    commandName = packetData.data.name;
    channelID = packetData.channel_id;
    guildID = packetData.guild_id;
    if (commandName == "frogge") {
        frogge(guildID, channelID);
    }
    else if (commandName == "bear") {
        bear(guildID, channelID);
    }
    else if (commandName == "jojo") {
        jojo(guildID, channelID);
    }
};
function frogge(guildID, channelID) {
    var guild = client.guilds.cache.find(function (guild) { return guild.id == guildID; });
    var channel = guild.channels.cache.get(channelID);
    var giphy = require("./config.json").giphy;
    var fetch = require("node-fetch");
    fetch("https://api.giphy.com/v1/gifs/random?api_key=" + giphy + "&tag=frog&rating=g")
        .then(function (res) { return res.json(); })
        .then(function (api) {
        channel.send(api.data.url);
    });
}
function bear(guildID, channelID) {
    var guild = client.guilds.cache.find(function (guild) { return guild.id == guildID; });
    var channel = guild.channels.cache.get(channelID);
    var tenor = require("./config.json").tenor;
    var fetch = require("node-fetch");
    fetch("https://api.tenor.com/v1/random?key=" + tenor + "&q=cute%20bears&locale=en_US&contentfilter=medium&limit=1")
        .then(function (res) { return res.json(); })
        .then(function (api) {
        channel.send(api.results[0].url);
    });
}
function jojo(guildID, channelID) {
    var guild = client.guilds.cache.find(function (guild) { return guild.id == guildID; });
    var channel = guild.channels.cache.get(channelID);
    var tenor = require("./config.json").tenor;
    var fetch = require("node-fetch");
    fetch("https://api.tenor.com/v1/random?key=" + tenor + "&q=jojos%20bizzare%20adventure&locale=en_US&contentfilter=medium&limit=1")
        .then(function (res) { return res.json(); })
        .then(function (api) {
        channel.send(api.results[0].url);
    });
}
/* =-=-=-=-=-=-=-=-=-= END OF Slash Commands!! =-=-=-=-=-=-=-=-=-= */
client.login(token);
