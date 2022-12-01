const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("verify a code use to level up!")
    .setDMPermission(false)
    .addStringOption(option =>
      option.setName("code")
        .setDescription(`Code To Be Executed`)
        .setRequired(true)),
  async execute(client, interaction) {
    var string = interaction.options.getString("code");
    if (string == '0') return interaction.reply({
      content: "Failed to execute code, make sure it's correct.",
      ephemeral: true
    }).catch(() => null);

    const PublicDatabase = require('@replit/database');
    const FetchData = new PublicDatabase();
    
    let PublicUserStatus = await FetchData.get(`userstatus_${interaction.user.id}`);

    let StarterRole_Code = await FetchData.get(`onstart_${interaction.user.id}`);
    let IsStarter = await FetchData.get(`isstarter_${interaction.user.id}`);
    if (StarterRole_Code == null) StarterRole_Code = '0';
    if (IsStarter == null) IsStarter = false;

    let GamerRole_Code = await FetchData.get(`ongame_${interaction.user.id}`);
    let IsGamer = await FetchData.get(`isgamer_${interaction.user.id}`);
    if (GamerRole_Code == null) GamerRole_Code = '0';
    if (IsGamer == null) IsGamer = false;

    let HunterRole_Code = await FetchData.get(`onhunt_${interaction.user.id}`);
    let IsHunter = await FetchData.get(`ishunter_${interaction.user.id}`);
    if (HunterRole_Code == null) HunterRole_Code = '0';
    if (IsHunter == null) IsHunter = false;

    let MasterRole_Code = await FetchData.get(`onmastery_${interaction.user.id}`);
    let IsMaster = await FetchData.get(`ismastery_${interaction.user.id}`);
    if (MasterRole_Code == null) MasterRole_Code = '0';
    if (IsMaster == null) IsMaster = false;

    try {
      if (string == StarterRole_Code) {
        await interaction.reply({
          content: `You've been awarded a prize.`,
          ephemeral: true
        }).catch(() => null);
        await interaction.member.roles.remove('1045889436744941639').catch(() => null);
        await interaction.member.roles.remove('1045889817789079692').catch(() => null);
        await interaction.member.roles.remove('1045890011884691480').catch(() => null);
        
        await interaction.member.roles.add('1040938057785937930').catch(() => null);
        await interaction.member.roles.add('1045890677801746453').catch(() => null);
        await interaction.member.roles.add('1045890905795723284').catch(() => null);
        await FetchData.set(`onstart_${interaction.user.id}`, '0');
        
        await FetchData.set(`isstarter_${interaction.user.id}`, true);
        await FetchData.set(`isgamer_${interaction.user.id}`, false);
        await FetchData.set(`ishunter_${interaction.user.id}`, false);
        await FetchData.set(`ismastery_${interaction.user.id}`, false);

        await FetchData.set(`userstatus_${interaction.user.id}`, 1);
      }
      else if (string == GamerRole_Code) {
        await interaction.reply({
          content: `You've been awarded a prize.`,
          ephemeral: true
        }).catch(() => null);
        await interaction.member.roles.remove('1045890011884691480').catch(() => null);
        await interaction.member.roles.remove('1045889817789079692').catch(() => null);
        await interaction.member.roles.remove('1040938057785937930').catch(() => null);
        
        await interaction.member.roles.add('1045889436744941639').catch(() => null);
        await interaction.member.roles.add('1045891030953775164').catch(() => null);
        await FetchData.set(`ongame_${interaction.user.id}`, '0');

        await FetchData.set(`isstarter_${interaction.user.id}`, false);
        await FetchData.set(`isgamer_${interaction.user.id}`, true);
        await FetchData.set(`ishunter_${interaction.user.id}`, false);
        await FetchData.set(`ismastery_${interaction.user.id}`, false);

        await FetchData.set(`userstatus_${interaction.user.id}`, 2);
      }
      else if (string == HunterRole_Code) {
        await interaction.reply({
          content: `You've been awarded a prize.`,
          ephemeral: true
        }).catch(() => null);
        await interaction.member.roles.remove('1045890011884691480').catch(() => null);
        await interaction.member.roles.remove('1045889436744941639').catch(() => null);
        await interaction.member.roles.remove('1040938057785937930').catch(() => null);
        
        await interaction.member.roles.add('1045889817789079692').catch(() => null);
        await interaction.member.roles.add('1045891295496917062').catch(() => null);
        await FetchData.set(`ongame_${interaction.user.id}`, '0');

        await FetchData.set(`isstarter_${interaction.user.id}`, false);
        await FetchData.set(`isgamer_${interaction.user.id}`, false);
        await FetchData.set(`ishunter_${interaction.user.id}`, true);
        await FetchData.set(`ismastery_${interaction.user.id}`, false);

        await FetchData.set(`userstatus_${interaction.user.id}`, 3);
      }
      else if (string == MasterRole_Code) {
        await interaction.reply({
          content: `You've been awarded a prize.`,
          ephemeral: true
        }).catch(() => null);
        await interaction.member.roles.remove('1040938057785937930').catch(() => null);
        await interaction.member.roles.remove('1045889436744941639').catch(() => null);
        await interaction.member.roles.remove('1045889817789079692').catch(() => null);
        
        await interaction.member.roles.add('1045890011884691480').catch(() => null);
        await interaction.member.roles.add('1045891419899969636').catch(() => null);
        await FetchData.set(`ongame_${interaction.user.id}`, '0');

        await FetchData.set(`isstarter_${interaction.user.id}`, false);
        await FetchData.set(`isgamer_${interaction.user.id}`, false);
        await FetchData.set(`ishunter_${interaction.user.id}`, false);
        await FetchData.set(`ismastery_${interaction.user.id}`, true);

        await FetchData.set(`userstatus_${interaction.user.id}`, 4);
      } else {
        return interaction.reply({
          content: "Failed to execute code, make sure it's correct.",
          ephemeral: true
        }).catch(() => null);
      }
    } catch (error) {
      if (error) return interaction.reply({
        content: "Failed to execute code, make sure it's correct.",
        ephemeral: true
      }).catch(() => null);
    }
  }
}