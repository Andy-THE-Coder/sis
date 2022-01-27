const { MessageEmbed } = require('discord.js')

const items = require('../../arrays/items');
module.exports = {
	name: 'buy',
	description: 'Buy a item', 
  cooldown: 4,
   async execute(message, args, client) {

if(!args[0]) return message.channel.send({embeds:[{
"color":16217088,"description":"use part of the item's name shown in `sis items`","title":"you need to give me an item to buy"}]})

const item = items.find((val) => val.id === args[0].toLowerCase());


if(!item) return message.channel.send({embeds:[{
"color":12634666,"description":"This isn't an item, use part of the item's name shown in `sis items`","title":"uh this didnt work"}]})

//complete: https://www.youtube.com/watch?v=RgmALWb5HS8


console.log(item);
   }

}