const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');

const { PermissionFlagsBits, WebhookClient } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('send')
    .setDescription('Send a message in codeblock and embeded')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
    .addStringOption(option =>
        option.setName('text')
        .setDescription('text to be released')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('webhook')
        .setDescription('webhook to be used')
        .setRequired(true)),
    async execute(client, interaction) {
        const text = interaction.options.getString('text');
        const url = interaction.options.getString('webhook');

        const webhookClient = new WebhookClient({ url: url });

        webhookClient.send({
          embeds: [
            {
              color: 0,
              description: codeBlock(text)
            }
          ]
        }).catch(() => null);
    }
}