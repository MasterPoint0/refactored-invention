module.exports = (client) => {
  const locate = require("node:fs").readdirSync;

  const path = require("node:path").join;


  const eventsPath = path(__dirname, "events");
  const eventFiles = locate(eventsPath).filter(file => file.endsWith(".js"));

  for (var file of eventFiles) {
    const Event = require(`./events/${file}`);

    client.on(Event.name, (...args) => Event.execute(client, ...args));
  };
}