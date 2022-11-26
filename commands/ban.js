const { SlashCommandBuilder } = require('@discordjs/builders');

const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a server member')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
    .addUserOption(option => 
        option.setName('user')
        .setDescription('user to be ban')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('reason of ban')
        .setRequired(true)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        await member.ban({ reason: reason }).catch(() => null);

        member.send({ embeds: [
          {
            color: 0,
            description: `:wave: Hey <@${member.id}> you have been banned in **${member.guild.name}**, You can no longer have access in our server. Goodbye!`,
            timestamp: new Date()
          }
        ]}).catch(() => null);
        await interaction.reply({ content: `${member.user.username} has been successfully banned from the guild, for the reason of: **${reason}**`}).catch(() => null);
    }
}