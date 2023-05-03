const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const config = require("./config.json");
const welcome = require("./welcome");

client.on("ready", () => {
  console.log("Our Discord bot is online");

  welcome(client);
});

client.login(process.env.TOKEN);
