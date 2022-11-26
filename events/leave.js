require('dotenv').config();

const Canvas = require('canvas');
const { Events, AttachmentBuilder, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ url: process.env['webhookURL2'] });
var welcomeCanvas = {};

welcomeCanvas.create = Canvas.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext('2d');
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage('./bg2.png').then(async (img) => {
  welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
  welcomeCanvas.context.fillText('Goodbye', 360, 360);
  welcomeCanvas.context.beginPath()
  welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true)
  welcomeCanvas.context.stroke()
  welcomeCanvas.context.fill()
});

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(client, member) {
    if (member.guild.id !== '1040933171019128914') return;
    
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
    let atta = new AttachmentBuilder(canvas.create.toBuffer(), { name: `goodbye-${member.id}.png` });

    try {

      webhookClient.send({
        embeds: [
          {
            color: Math.floor(Math.random() * 1000000),
            title: `Goodbye ${member.user.username}!`,
            description: `**${member.user.username}** leave the server.`,
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
      });
      
    } catch (error) {
      console.log(error);
    }
  }
}