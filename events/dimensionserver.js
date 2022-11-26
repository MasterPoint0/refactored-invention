const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(client, member) {
    try {
      if (member.guild.id !== '1040939250675367947') return;

      const PublicDatabase = require('@replit/database');
      const FetchData = new PublicDatabase();

      let PublicUserStatus = await FetchData.get(`userstatus_${member.id}`);
      let PublicUserJoined = await FetchData.get(`userjoined_${member.id}`);
      let PublicUserJoined_Dimension = await FetchData.get(`userjoinedd_${member.id}`);
      if (PublicUserStatus == null) PublicUserStatus = 1;
      if (PublicUserJoined == null) PublicUserJoined = false;
      if (PublicUserJoined_Dimension == null) PublicUserJoined_Dimension = false;
      
      switch (PublicUserJoined) {
        case true:
          switch (PublicUserStatus) {
            case 1:
              member.roles.add('1045906845581185105').catch(() => null);
              await FetchData.set(`userjoinedd_${member.id}`, true);
              break;
            case 2:
              member.roles.add('1045906776383565884').catch(() => null);
              await FetchData.set(`userjoinedd_${member.id}`, true);
              break;
            case 3:
              member.roles.add('1045906831383474217').catch(() => null);
              await FetchData.set(`userjoinedd_${member.id}`, true);
              break;
            case 4:
              member.roles.add('1045906842578063420').catch(() => null);
              await FetchData.set(`userjoinedd_${member.id}`, true);
              break;
            case 5:
              member.roles.add('1045906839939858543').catch(() => null);
              await FetchData.set(`userjoinedd_${member.id}`, true);
              break;
            default:
              member.kick().catch(() => null);
              break;
          };
          break;
        case false:
          member.kick().catch(() => null);
          break;
        default:
          member.kick().catch(() => null);
          break;
      }

    } catch (error) {
      console.log(error);
      member.kick().catch(() => null);
    }
  }
} 