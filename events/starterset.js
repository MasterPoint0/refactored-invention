const { Events } = require('discord.js');
const PublicDatabase = require('@replit/database');
const FetchData = new PublicDatabase();

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'generate-new-key') return;

    const key = Math.random().toString(36).substr(2, 20);

    let StarterRole_Code = await FetchData.get(`onstart_${interaction.user.id}`);
    let IsStarter = await FetchData.get(`isstarter_${interaction.user.id}`);
    if (StarterRole_Code == null) StarterRole_Code = '0';
    if (IsStarter == null) IsStarter = false;

    await FetchData.set(`onstart_${interaction.user.id}`, key);

    await interaction.reply({
      content: `type this in StartingPoint Server\n> **/verify ${key}**`,
      ephemeral: true
    }).catch(() => null);

    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    await sleep(10000);

    await interaction.member.kick().catch(() => null);
  }
}
