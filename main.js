require('dotenv').config();
require('colors');

const { Client, Events, IntentsBitField, Partials } = require('discord.js');

const ClientToken = "MTA0NDk1NTU5MTA0NDUwMTUwNA.GJBviA.oUUrch2-zD04tSrOAnyrE8wRJ1IqXram3K2SlU";

try {

    var client = new Client({
        intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
        partials: [Partials.Guilds, Partials.Message, Partials.Reaction],
        shards: 'auto',
        allowedMentions: false
    });

    client.on(Events.ClientReady, function() {
        console.log(`Login as ${(client.user.tag).toString().yellow}`);
    });

    (function(_a) {
        if (_a) {
            if (_a !== true) return;

            var _run = (target) => { require(`./${target}`)(client) };

            _run('deploy-status.js');
            _run('slash.js');
            _run('deploy-slash.js');
        } else return;
    })(true);

    client.login(ClientToken);
} catch (error) {
    if (error) return console.error(error);
};