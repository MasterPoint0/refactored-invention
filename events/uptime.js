const { Events, WebhookClient } = require('discord.js');

require('colors');

module.exports = {
  name: Events.ClientReady,
  async execute(client, stream) {
    const webhookClient = new WebhookClient({ url: process.env['webhookURL3'] });
    
    setInterval(() => {
      webhookClient.send({
        embeds: [
          { color: Math.floor(Math.random() * 1000000), description: `Ping \`${client.ws.ping}ms\``}
        ]
      });
    }, 60000);
  }
}