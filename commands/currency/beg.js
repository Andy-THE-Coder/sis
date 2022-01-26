const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'beg',
	description: 'Beg for some coins lmao there\'s a 35% chance to get a lifesaver (I will react with <:sislife:935448521123967018> if you do)', 
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

    let moneyEmbed = new MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`ok sure, have ${amount} coins ${
        message.channel.permissionsFor(message.client.user).has("ADD_REACTIONS") ? "" : (getsLife ? "You also got a life saver": "")
      }`);
      msg.edit({content:`${message.author}`,embeds:[moneyEmbed]});
if(Math.random() < 0.35) {
  await message.client.addItems(message.author.id, 'lifes', 1)
  await msg.react("<:sislife:935448521123967018>");
}

    })

   }

}