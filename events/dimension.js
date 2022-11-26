const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(client, member) {
    if (member.guild.id !== '1040939250675367947') return;

    const startingPointGuild = client.guilds.cache.get('1040933171019128914');

    const user = startingPointGuild.members.fetch((member.id).toString());

    if (user.roles.cache.has('1040938057785937930') == true) {
      member.roles.add('1045906845581185105').catch(() => null);
    }
}