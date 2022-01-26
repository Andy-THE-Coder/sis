const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'beg',
	description: 'beg', 
  cooldown: 20,
   async execute(message) {

    const msg = await message.channel.send("Hmm, let me think...").then(async (msg)=> {
      
      
      const chances = Math.floor(Math.random() * 110);

      if(chances <= 20){
        //20% chances
      return msg.edit({content:"No coins for you _exit_"});
      }
    const amount = Math.floor(Math.random() * 100) + 20;
    message.client.economy.add(`${message.author.id}.money`, amount)

const lifeChances = Math.floor((Math.random() * 4) + 1);
let getsLife;
if(lifeChances === 1) {
  await message.client.addItems(message.author.id, 'lifes', 1)
  getsLife = true;
}

    let moneyEmbed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`ok sure, have ${amount} coins ${
        message.channel.permissionsFor(message.client.user).has("ADD_REACTIONS") ? "" : (getsLife ? "You also got a life saver": "")
      }`);
      msg.edit({content:`${message.author}`,embeds:[moneyEmbed]});
      if(getsLife) await msg.react("<:sislife:935448521123967018>");

    })

   }

}