exports.run = (client, message, args) => {
  let db = client.mongoc.db("Bitshares");
  let collection = db.collection("Discord_Users");
  collection.findOne({'discord_user': message.author.id}, (err, res) => {
    if (res === null) {
      message.reply("Account not found. Try to register it, To know more, use `!help` command.");
    }
    else {
      message.reply("Your Account is successfully connected, Please verify with below details from Bitshares. To change it again, type `!update to <new_bitsahres_name>`, For more info type `!help`");
        try {
      client.axios.get('https://explorer.bitshares-kibana.info/account?account_id=' + res.bitshares_name).then((res) => {
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
        }).catch(err => message.reply("There is an issue in finding your account."));
    }
    catch(err) {
      message.reply("There is problem in getting your account, Hope you've registered yourself. For more information, Use `!help` command.")
    }
  }
  })
}
