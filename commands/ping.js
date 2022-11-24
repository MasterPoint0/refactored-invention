const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!")
        .setDMPermission(false)
        .addStringOption(option => 
            option.setName("type")
            .setDescription(`Slash Response type`)
            .setRequired(true)
            .addChoices(
                { name: "latency", value: "Ping Client WebSocket Latency" },
                { name: "reply", value: "Client Replies With Pong" }
            )),
    async execute(client, interaction) {
        var string = interaction.options.getString("type");
        
        switch (string) {
            case "Ping Client WebSocket Latency": 
                await interaction.reply({ content: `**${client.user.username}** WebSocket Ping **${client.ws.ping}ms**`, ephemeral: true });
                break;
            case "Client Replies With Pong":
                await interaction.reply({ content: `<@${interaction.user.id}>, Pong!`, ephemeral: true });
                break;
            default:
                return;
                break;
        };
    }
}