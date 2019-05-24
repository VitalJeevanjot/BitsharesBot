const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const client = new Discord.Client();
const config = require("./config.json");
const axios = require("axios");
var cors = require('cors')
const express = require('express')
const app = express()
var ida = []
var idd = []
let done_at_two = 0;
app.use(cors())
app.get('/users_acceptor/:ida', function (req, response) {
  client.fetchUser(req.params.ida).then((res) => {
    // console.log(res)
    ida[0] = res.username + '#' + res.discriminator.toString()
    ida[1] = (res.avatar === null || !res.avatar) ? 'https://cdn.discordapp.com/embed/avatars/0.png' : 'https://cdn.discordapp.com/avatars/' + res.id + '/' + res.avatar
    response.send(ida)
  })
})
app.get('/users_donator/:idd', function (req, response) {
  client.fetchUser(req.params.idd).then((res) => {
    // console.log(res)
    idd[0] = res.username + '#' + res.discriminator.toString()
    idd[1] = (res.avatar === null || !res.avatar) ? 'https://cdn.discordapp.com/embed/avatars/0.png' : 'https://cdn.discordapp.com/avatars/' + res.id + '/' + res.avatar
    response.send(idd)
  })
})
app.get('/send_success/:ida/:idd/:bts', function (req, response) {
  client.channels.find('name', 'accountant-bot').send('<@' + req.params.idd + '> Sent a tip to <@' + req.params.ida + '> of ' + req.params.bts.toString() + ' Satoshis of BTS where 100000 = 1 BTS').then((res) => {
    // console.log(res)
    response.send("done")
  })
})

app.listen(3000)
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.axios = axios;
const uri = config.uridb;
client.mongoc = new MongoClient(uri, { useNewUrlParser: true });
client.mongoc.connect(err => {
  let db = client.mongoc.db("Bitshares");
  let collection = db.collection("Discord_Users");
  collection.createIndex({"discord_user": 1}, { unique: true })
  collection.createIndex({"bitshares_name": 1}, { unique: true })
  console.log("Added Indexes, Now commands can be executed..");
  done_at_two++;
  nowDone();
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
  console.log("Wait..");
});

client.login(process.env.TOKEN);
client.on('ready', () => {
  done_at_two++;
  nowDone();
  console.log('Discord Bot Ready');
});
function nowDone() {
  console.log(done_at_two);
  if(done_at_two<2){
    return;
  }
  else {
    console.log(done_at_two);
    client.channels.find('name', 'accountant-bot').send('The Bot is ready to be used..')
  }
}
client.on('error', console.error);
// tip
// verify
// support
// update
// help
// kick is not required
// change the tip created url to the right website hosted address.
