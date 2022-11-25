const { Events } = require('discord.js');

require('colors');

module.exports = {
  name: Events.ClientReady,
  async execute(client, stream) {
    console.log(`Event Is Now Online ${(client.user.username).green}`);
  }
}