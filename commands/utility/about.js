const { MessageEmbed } = require("discord.js");
module.exports = {
	name: 'about',
	description: 'Basic information about the bot.',
	aliases: ['info'],
  execute(message){

    const embed = new MessageEmbed()
    .setTitle("About this bot")
    .setTimestamp()
    .setDescription(
`
This bot is a heavily modified version of the Bro#6418: **[invite link](https://discord.com/oauth2/authorize?client_id=543624467398524935&scope=bot%20applications.commands&&permissions=2146958591)**. It is in **__no way affiliated/owned by the official Bro bot developers__** and it only exists for fun/learning from code.

Owners/Developers: <@773534174547279873>

It's currently in development and will have more features that distinguish it from Bro in the future.

Also it will most likely utilize slash commands this year (2022) because of [this deprecation to message content by Discord.](https://support-dev.discord.com/hc/en-us/articles/4404772028055)

`
    )
.setColor("RANDOM")

message.reply({embeds:[embed]})

  }
}