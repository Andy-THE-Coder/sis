const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'balance',
	description: 'Check ur balance', 
  aliases: ['bal'],
  cooldown: 10,
   async execute(message, args, client) {
let user = message.mentions.members.first() || message.guild.members.cache.find(mem => mem.user.tag === message.params.trim()) || message.member;
console.log(db)
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