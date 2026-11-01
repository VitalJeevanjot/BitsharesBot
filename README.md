# BitsharesBot

A 2019 Discord bot for tipping on the BitShares blockchain. Users register and verify their BitShares account, then tip each other from Discord. It is written in Node.js with discord.js, bitsharesjs and btsdex, and stores users in MongoDB. Its web front end is [Bitshares-TipBot-FrontEnd](https://github.com/VitalJeevanjot/Bitshares-TipBot-FrontEnd).

Commands: `help`, `ping`, `register`, `verify`, `tip`, `update`.

## Configuration

Copy `config.example.json` to `config.json` and fill in your Discord bot token, command prefix and MongoDB connection string. `config.json` is git-ignored, so never commit real credentials.

## Status

Archived 2019 project, not maintained.
