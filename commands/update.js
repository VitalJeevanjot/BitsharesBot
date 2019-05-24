exports.run = (client, message, args) => {
  if (args.length > 0) {
    // client.mongoc.close();
    // client.mongoc.connect(err => {
      let db = client.mongoc.db("Bitshares");
      let collection = db.collection("Discord_Users");
      client.axios.get('https://explorer.bitshares-kibana.info/account?account_id=' + args[0]).then((res) => {
          message.reply({embed: {
            color: 0x4285F4,
            fields: [{
              name: "Id: ",
              value: res.data.id
            },
            {
              name: "Memo Key: ",
              value: res.data.options.memo_key
            },
            {
              name: "Name: ",
              value: res.data.name
            }]
          }});
        collection.updateOne({'discord_user': message.author.id}, { $set:  {'bitshares_name': args[0]} }, (err, res) => {
          // console.log(res.result);
          if (res.result.n === 0) {
            message.reply("Problem in finding account. If you have already registered then you can easily find out by typing `!verify` command.");
          }
          else {
            message.channel.send("Your Account have been successfully updated <@"+ message.author.id +">, Please verify with above details. To change it again, type `!update <new_bitsahres_name>`, For more info type `!help`");
          }
        })
      }).catch(err => message.channel.send("There is an issue in finding your account."))
    // })
  } else {
    // Grab the command data from the client.commands Enmap
    message.channel.send("Your command not seems to be correct.");
    const cmd = client.commands.get("help");

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
  }
}
