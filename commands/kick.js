const { SlashCommandBuilder } = require('@discordjs/builders');

const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a server member')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild)
    .addUserOption(option => 
        option.setName('user')
        .setDescription('user to be kick')
        .setRequired(true)),
    async execute(client, interaction) {
        const member = interaction.options.getMember('user');

        await member.kick({ reason: "none provided" }).catch(() => null);
      
        await interaction.reply({ content: `${member.user.username} has been successfully kicked from the guild.`}).catch(() => null);
    }
}