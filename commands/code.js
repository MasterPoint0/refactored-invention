const { SlashCommandBuilder } = require('@discordjs/builders');

const { PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("code")
        .setDescription("Sends a custom coded command!")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild),
    async execute(client, interaction) {
      const webhookClient = new WebhookClient({ url: process.env['webhookURL4'] });

      webhookClient.send({
        content: `Hey **user**! You discovered this secret server? Well I think this won't happened if you a spent a lot of time reading the rules, **Because of this I'll give you a reward, Click/PUSH** the button below to earn your reward.`,
        embeds: [
          {
            color: 0,
            title: 'Additional',
            description: `Try visiting this site, This might help you what next role you're targetting next!\n> :link: **https://galaxytechnician.netlify.app/posts/startingpointranks**`,
            footer: {
              text: 'Powered By GalaxyTechnician API.'
            },
            timestamp: new Date()
          }
        ],
        components: [
          new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setCustomId('generate-new-key')
            .setLabel('Claim')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(false)
          )
        ]
      }).catch(() => null);
    }
}