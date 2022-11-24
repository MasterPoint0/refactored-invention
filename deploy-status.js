module.exports = (client) => {
    const { Events, ActivityType, ApplicationCommandOptionWithChoicesAndAutocompleteMixin } = require('discord.js');

    client.on(Events.ClientReady, async function() {
        try {
            await client.user.setActivity("GalaxyTechnician", { type: ActivityType.Listening } );

            console.log(`Client status has been ${("changed").green}!`);
        } catch (error) {
            console.log(error);
        }
    });
};