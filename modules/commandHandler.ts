module.exports = {
  commands(client) {
    /// const { client } = require('../ICOCteen.ts');
    const Discord = require("discord.js");
    const fs = require("fs");

    ////////////////////
    // COMMAND HANDLER
    ////////////////////

    const commandDir = "./commands";

    // Searches through "./commands" for files ending in .ts
    client.commands = new Discord.Collection();
    const commandFiles = fs
      .readdirSync(`${commandDir}`)
      .filter((file) => file.endsWith(".ts"));
    const otherCommandFiles = fs
      .readdirSync(`${commandDir}/fun`)
      .filter((file) => file.endsWith(".ts"));
    const infoCommandFiles = fs
      .readdirSync(`${commandDir}/info`)
      .filter((file) => file.endsWith(".ts"));
    const miscCommandFiles = fs
      .readdirSync(`${commandDir}/misc`)
      .filter((file) => file.endsWith(".ts"));
    const modCommandFiles = fs
      .readdirSync(`${commandDir}/mod`)
      .filter((file) => file.endsWith(".ts"));
    const xpCommandFiles = fs
      .readdirSync(`${commandDir}/xp`)
      .filter((file) => file.endsWith(".ts"));
    const shopCommandFiles = fs
      .readdirSync(`${commandDir}/commerce`)
      .filter((file) => file.endsWith(".ts"));
    // const combatCommandFiles = fs.readdirSync(`${commandDir}/combat`).filter(file => file.endsWith('.ts'));
    // const gachaCommandFiles = fs.readdirSync(`${commandDir}/gacha`).filter(file => file.endsWith('.ts'));
    const testCommandFiles = fs
      .readdirSync(`${commandDir}/test`)
      .filter((file) => file.endsWith(".ts"));

    // Add file names to command collection
    for (const file of commandFiles) {
      const command = require(`.${commandDir}/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of otherCommandFiles) {
      const command = require(`.${commandDir}/fun/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of infoCommandFiles) {
      const command = require(`.${commandDir}/info/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of miscCommandFiles) {
      const command = require(`.${commandDir}/misc/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of modCommandFiles) {
      const command = require(`.${commandDir}/mod/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of xpCommandFiles) {
      const command = require(`.${commandDir}/xp/${file}`);
      client.commands.set(command.name, command);
    }
    for (const file of shopCommandFiles) {
      const command = require(`.${commandDir}/commerce/${file}`);
      client.commands.set(command.name, command);
    } /*
    for (const file of combatCommandFiles) {
        const command = require(`.${commandDir}/combat/${file}`);
        client.commands.set(command.name, command);
    }
    for (const file of gachaCommandFiles) {
        const command = require(`.${commandDir}/gacha/${file}`);
        client.commands.set(command.name, command);
    }*/
    for (const file of testCommandFiles) {
      const command = require(`.${commandDir}/test/${file}`);
      client.commands.set(command.name, command);
    }
  },
};
