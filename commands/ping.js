exports.run = (client, message, args) => {
    message.channel.send("pong!").catch(console.error);
     // let u =  client.fetchUser(message.author.id);
     // if(!u) console.log("Error not found user");
     // else console.log(u);
}
