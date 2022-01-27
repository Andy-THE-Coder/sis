const { MessageEmbed } = require('discord.js')

const items = require('../../arrays/items');
module.exports = {
	name: 'buy',
	description: 'Buys an item from the shop, as long as its not a special item', 
  cooldown: 2,
   async execute(message, args, client) {

if(!args[0]) return message.channel.send({embeds:[{
"color":16217088,"description":"use part of the item's name shown in `sis items`","title":"you need to give me an item to buy"}]})

if(message.params.trim().length < 4) message.channel.send({embeds:[{"color":10077329,"description":"**I'm going to need more letters if you wanna get information on this item.**"}]});

const mainItem = client.getItem(message.params);
if(!mainItem) return message.channel.send({embeds:[{
"color":12634666,"description":"This isn't an item, use part of the item's name shown in `sis items`","title":"uh this didnt work"}]})

const item = mainItem[0].item;

if(mainItem[0].similarity < 0.65) return message.channel.send({embeds:[{
"color":12634666,"description":"This isn't an item, use part of the item's name shown in `sis items`","title":"uh this didnt work"}]})

console.log(item)

//complete: https://www.youtube.com/watch?v=RgmALWb5HS8


   }

}