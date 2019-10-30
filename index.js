//Calling package
const Discord = require("discord.js");
const { prefix, token, giphyToken } = require("./config.json");
const client = new Discord.Client();
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient(giphyToken);
const fs = require("fs");
const Enmap = require("enmap");
require("dotenv/config");
const http = require("http");
const port = process.env.PORT || 3000;

//This is a simple server
http.createServer().listen(port);
//creates a new enmap
client.commands = new Enmap();

client.on("ready", () => {
  console.log("Ready!");
});

//Listener Event: Message  Recieved ( this will run every time a message is recieved)
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  //Runs the folder Commands
  cmd.run(client, message, args, giphy);
});

//Automatically joins a role
client.on("guildMemberAdd", member => {
  let role = member.guild.roles.find("name", "Everyone");
  member.addRole(role);
});

client.on("error", err => {
  console.log(err);
});

//Access the folder commands
fs.readdir("./commands/", async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`); //the name of the command is the file -- ban.js == ban
    let cmdName = file.split(".")[0];
    // console.log(`Loaded command '${cmdName}'.`);
    client.commands.set(cmdName, props);
  });
});

//Login
client.login(process.env.TOKEN);
