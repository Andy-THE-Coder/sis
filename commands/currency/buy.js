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

const mainItem = client.getItem(args[0]);
if(!mainItem) return message.channel.send({embeds:[{
"color":12634666,"description":"This isn't an item, use part of the item's name shown in `sis items`","title":"uh this didnt work"}]})

if(mainItem[0].similarity < 0.65) return message.channel.send({embeds:[{
"color":12634666,"description":"This isn't an item, use part of the item's name shown in `sis items`","title":"uh this didnt work"}]})

const item = mainItem[0].item;
const itemPrice = item.cost;
if(!itemPrice) return message.channel.send(`${message.author} this item can't be bought.`);

const amount = Number(args[1]) || 1;
if(amount < 1 || amount%1 !== 0) return message.reply({content:"yeah, I'd totally let you buy a negative/fraction of an item from the shop"})

const reqMoney = Number(itemPrice) * amount;
console.log(reqMoney)
if(client.economy.get(`${message.author.id}.money`) < reqMoney) return message.reply({content:"lmao you cant afford this, withdraw coins or get richer"});

console.log(client.addItems(message.author.id, item.id, amount))
client.economy.subtract(message.author.id + ".money", reqMoney)

const buyEmbed = new MessageEmbed()
.setAuthor({name:"Successful Purchase", icon_url: message.author.displayAvatarURL({default:true})})
.setColor("#36b383")
.setDescription(`${message.author}, you bought \`${amount}\` **${item.name}** for **\`${reqMoney.toLocaleString()}\`** coins`)
 
 message.channel.send({embeds:[buyEmbed]})

//complete: https://www.youtube.com/watch?v=RgmALWb5HS8


   }

}