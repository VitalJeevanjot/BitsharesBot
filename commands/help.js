exports.run = (client, message, args) => {
  message.channel.send({embed: {
    color: 0x4285F4,
    fields: [{
      name: "Register Yourself => example",
      value: '`!register <bts_wallet_name>` => !register jeevan11 '
    },
    {
      name: "Tip someone on Discord Server => example",
      value: '`!tip <discord_mention>` => !tip @Genievot'
    },
    {
      name: "Update existing account => example",
      value: '`!update <new_bts_wallet_name>` => !update jeevan-jot'
    },
    {
      name: "Verify existing account (example)",
      value: '`!verify`'
    },
    {
      name: "Help (example)",
      value: '`!help`'
    }]
  }});
}
