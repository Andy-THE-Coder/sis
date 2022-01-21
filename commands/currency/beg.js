const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'beg',
	description: 'beg', 
  cooldown: 10,
   async execute(message, args, client) {

const res = ["success", "fails"];

const begTitles = client.arrays.get('begs')
let guy = begTitles[Math.floor(Math.random()*begTitles.length)]
let sof = guy[res[Math.floor(Math.random()*res.length)]];
console.log(sof);

let moneyEmbed = new MessageEmbed()
  .setColor("#FFFFFF")
  .setTitle(guy.name)
  .setDescription(`<:Check:618736570337591296> You've begged and received ${amount} coins`);
  message.channel.send({embeds:[moneyEmbed]})
  //client.economy.add(`${user.id}.money`, amount)

   }

}