require('dotenv').config();
require('colors');

const keep_Alive = require('./server.js');

const { Client, Events, IntentsBitField, Partials } = require('discord.js');

const ClientToken = process.env['token'];

try {

    var client = new Client({
        intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
        partials: [Partials.Guilds, Partials.Message, Partials.Reaction],
        shards: 'auto',
        allowedMentions: { parse: ['users', 'roles'] }
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
            _run('event-handling.js')
        } else return;
    })(true);

    client.login(ClientToken);
} catch (error) {
    if (error) return console.error(error);
};

keep_Alive();