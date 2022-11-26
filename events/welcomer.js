require('dotenv').config();

const Canvas = require('canvas');
const { Events, AttachmentBuilder, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env['webhookURL'] });
var welcomeCanvas = {};

welcomeCanvas.create = Canvas.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext('2d');
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage('./bg.jpg').then(async (img) => {
  welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
  welcomeCanvas.context.fillText('Welcome', 360, 360);
  welcomeCanvas.context.beginPath()
  welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true)
  welcomeCanvas.context.stroke()
  welcomeCanvas.context.fill()
});

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(client, member) {
    if (member.guild.id !== '1040933171019128914') return;

    const PublicDatabase = require('@replit/database');
    const FetchData = new PublicDatabase();

    let PublicUserStatus = await FetchData.get(`userstatus_${member.id}`);
    let PublicUserJoined = await FetchData.get(`userjoined_${member.id}`);

    if (PublicUserStatus == null) PublicUserStatus = 1;
    
    let canvas = welcomeCanvas;
    canvas.context.font = '42px sans-serif';
    canvas.context.textAlign = 'center';
    canvas.context.fillText(member.user.username, 512, 410);
    canvas.context.font = '32px sans-serif';
    canvas.context.fillText = (`You are the ${member.guild.memberCount}th`, 512, 455);
    canvas.context.beginPath();
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();
    await Canvas.loadImage(member.user.displayAvatarURL({ extension: "jpg", size: 1024 }))
      .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
      });
    let atta = new AttachmentBuilder(canvas.create.toBuffer(), { name: `welcome-${member.id}.png` });

    try {

      webhookClient.send({
        embeds: [
          {
            color: Math.floor(Math.random() * 1000000),
            title: `Welcome ${member.user.username}!`,
            description: `:wave:Welcome to **${member.guild.name}**, This guild is currently on testing/working, You may experience slow message output and inaccessible channels. Have Fun!`,
            thumbnail: {
              url: member.user.displayAvatarURL({ extension: 'png', size: 1024 })
            },
            footer: {
              text: "Powered By GalaxyTechnician API."
            },
            timestamp: new Date()
          }
        ],
        files: [atta]
      }).catch(() => null);

      member.roles.add('1040938057785937930').catch(() => null);
      await FetchData.set(`userjoined_${member.id}`, true);
      
    } catch (error) {
      member.kick().catch(() => null);
    }
  }
}