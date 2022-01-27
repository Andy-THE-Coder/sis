const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'balance',
	description: 'Check your coin balance, or someone elses', 
  aliases: ['bal'],
  cooldown: 5,
   async execute(message, args, client) {

let user = message.mentions.members.first() || message.guild.members.cache.find(mem => mem.user.tag === message.params.trim()) || message.member;

  let bal = await client.economy.fetch(`${user.id}.money`)
  if (!bal) bal = 0;

  let bank = await client.economy.fetch(`${user.id}.bank`)
  if (!bank) bank = 0;

  let maxbank = await client.economy.fetch(`${user.id}.maxBank`)
  if (!maxbank) maxbank = 500;

  let moneyEmbed = new MessageEmbed()
  .setTitle(user.user.username+"'s Balance")
  .setDescription(`**Wallet:** ${bal}\n**Bank:** ${bank} / ${maxbank} \`(${(bank/maxbank)*100}%)\``)
  .setTimestamp()
  message.reply({embeds:[moneyEmbed]})

   }

}