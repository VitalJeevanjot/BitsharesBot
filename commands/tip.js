exports.run = (client, message, args) => {
    // !tip @user
    // client.mongoc.connect(err => {
    try {
    if (message.mentions.members.size === 0)
      return message.reply("Please mention a user to tip.");
    let channelid = message.channel.id;
    let userMentioned = message.mentions.members.first().id;
    let db = client.mongoc.db("Bitshares");
    let collection = db.collection("Discord_Users");
    try {
    collection.findOne({discord_user: userMentioned}, (err, res) => {
      if (!res) {
      message.reply("Error in finding user id. Please Make sure it's registered")
    }
      if (res) {
        // console.log(res);
        message.reply("You can go to link and tip this user: http://bts.jaeven.com/#/user/" + message.author.id + "/" + userMentioned + "/" + res.bitshares_name + "/" + channelid);
      }
    })
  }
  catch (err) {
    message.reply("Error in getting user.")
    console.log(err);
  }
}
catch (err) {
  console.log("Error on User mention");
}
  //})
}
