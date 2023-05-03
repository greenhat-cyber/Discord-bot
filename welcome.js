const Discord = require("discord.js");
const { createCanvas, loadImage } = require("canvas");

module.exports = (client) => {
  const channelId = "1102857584614060084";
  const rulesChannel = "1102298407973953636";

  // client.on("guildMemberAdd", async (member) => {
  //   console.log(member);

  //   const message = ` Hey <@${
  //     member.id
  //   }> Welcome to ibiliz gaming server! Use ${member.guild.channels.cache
  //     .get(rulesChannel)
  //     .toString()} For interacting with the others.`;

  //   const channel = member.guild.channels.cache.get(channelId);
  //   await channel.send(message);
  //   await channel.send("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg");
  // });

  client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "welcome"
    );

    if (!channel) return;

    const canvas = createCanvas(800, 450);
    const ctx = canvas.getContext("2d");

    // Load the background image and draw it on the canvas
    const background = await loadImage("./images/wlcbg.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Load the user's avatar image and draw it within a circular boundary
    const avatar = await loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.save(); // Save the current canvas state
    ctx.beginPath();
    ctx.arc(400, 125, 75, 0, Math.PI * 2, true);
    ctx.lineWidth = 6; // Set the width of the stroke to 6 pixels
    ctx.strokeStyle = "#fff"; // Set the color of the stroke to white
    ctx.stroke(); // Draw the stroke
    ctx.closePath();
    ctx.clip(); // Set the circular boundary as the clipping path
    ctx.drawImage(avatar, 325, 50, 150, 150,); // Draw the avatar image within the circular boundary
    ctx.restore(); // Restore the canvas state
    
    ctx.font = "bold 50px ";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(`WELCOME TO ${member.guild.name}`, canvas.width / 2, 260);

    ctx.font = "light 20px ";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(
      `${member.user.username}#${member.user.discriminator}`,
      canvas.width / 2,
      325
    );

    const joinedMembers = member.guild.members.cache.filter((m) => m.joinedAt);
    const position =
      joinedMembers
        .sort((a, b) => a.joinedAt - b.joinedAt)
        .array()
        .indexOf(member) + 1;

    ctx.font = "light 20px ";
    ctx.fillStyle = "#0BE7F5";
    ctx.textAlign = "center";
    ctx.fillText(
      `You Are The ${position}${getOrdinalSuffix(position)} Member`,
      canvas.width / 2,
      360
    );
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
    channel.send(
      `Hey ${member}, welcome to ${member.guild.name}! Use <#1102298407973953636> For interacting with the others.`,
      attachment
    );
  });

  function getOrdinalSuffix(i) {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  }
};
