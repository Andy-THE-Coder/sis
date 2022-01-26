const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
	name: 'mine',
	description: 'Get items and maybe some coins from mining, you need a pickaxe to do this.', 
  cooldown: 18,
   async execute(message) {
const client = message.client
if(Math.random() < 0.05){
  //lost pickaxe
  let lostPick = new MessageEmbed()
  .setTitle("well... 😔")
  .setDescription("You tried mining but digged too deep, fell into the hole and died. Your pickaxe was also lost so you need to buy a new one too with `bro buy pick` 😔")
  .setColor("RANDOM")
  .setFooter({text:"5% chance of this happening"})

  return message.channel.send({embeds:[lostPick]})
}


let desc, chances;
let d = Math.random();
if (d < 0.28){
  // 28%
client.addItems(message.author.id, 'berries');
desc = "You found some <:berries:935833832379252806> **Poisonous Berries**, you can sell them for some coins or collect them!";
chances = 28;

}else if (d > 0.27 && d < 0.53){
  // 25%
client.addItems(message.author.id, 'stick');
desc = "You dug up a... <:stick:935833608160161832> Wooden Stick while mining, congrats?";
chances = 25

}else if (d > 0.52 && d < 0.73){
  // 20%
client.addItems(message.author.id, 'ironore')
desc = "You used your pickaxe to mine and found <:iron_ore:935833434142679040> **Iron Ore**";
chances = 20;
}else if (d > 0.72 && d < 0.88){
  // 15%
client.addItems(message.author.id, 'stone')
desc = "You tried mining and you found some <:stone:935833141019553864> **Old Stone**";
chances = 15;
}else if (d > 0.87 && d < 0.98){
  // 10%
client.addItems(message.author.id, 'potato')
desc = "You tried mining and you found some useless potatoes 🥔 in the dirt :RIP:. It's so useless that it's worth **0 coins**, absolutely nothing."
chances = 10
}else {
  // 2%
client.addItems(message.author.id, 'diamond')
desc = "You were lucky enough to get a <:diamond:935832785011228756> **Shiny Diamond**"
chances = 10
}

const mineEmbed = new MessageEmbed()
.setFooter({text: `${chances}% chance of this happening`})
.setDescription(desc)
.setColor("RANDOM")

message.reply({embeds:[mineEmbed]});

   }
}