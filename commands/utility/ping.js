const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'This is the ping command',
    cooldown: 6,
    async execute(message) {
        
      const cnt = new Date().getTime();
      const ping = cnt - message.createdAt; 
      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail("https://cdn.discordapp.com/emojis/917352131529433148.gif")
      .setTitle("Pong")
      .setDescription(`Your ping is \`${ping}\` ms\nLatency is \`${message.client.ws.ping}\` ms`)
      message.channel.send({embeds:[embed]})
    }
}