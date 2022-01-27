require('dotenv').config();
const { MessageEmbed, Client, Intents, Collection} = require('discord.js');
const fs = require('fs');
const db = require('quick.db')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
Intents.FLAGS.GUILD_PRESENCES,
Intents.FLAGS.GUILD_MEMBERS,
] });

//collection
client.commands = new Collection();
client.cooldowns = new Collection();
client.arrays = new Collection();
client.economy = db.table('economy');


require("./useful/fuzzy")(client);

//---------------------------------------
//-----DATABASE----

/*
//mongoose.js / mongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env['SRV'], {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(console.log('Connected successfully to mongoDB')).catch(err => {
  console.log(err);
});
*/

//mongoDB -> collection
//require("./useful/loadData")(client);

//---------------------------------------
//-----ARRAY HANDLER----

const arrayFiles = fs.readdirSync('./arrays').filter(file => file.endsWith('.json'));

for (const file of arrayFiles) {
	const array = require(`./arrays/${file}`);
	client.arrays.set(`${file.substring(0,file.length - 5)}`, array);
}

//---------------------------------------
//-----EVENT HANDLER----


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//---------------------------------------
//-----COMMAND HANDLER---

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
    command.category = folder;
  }
}
console.log(`▩⇛  Loaded ${client.commands.size} commands`)


//---------------------------------------
//-----MESSAGE HANDLER---


client.on('messageCreate', async message => {
//no bots n webhooks
if(message.author.webhook) return;
if(message.channel.type ==="DM") return;

let prefix = process.env['prefix'];

if(message.author.bot) return;

if (message.content.startsWith(`<@!${client.user.id}>`)||message.content.startsWith(`<@${client.user.id}>`)) {

if (message.content.startsWith(`<@!${client.user.id}>`))
  message.content = message.content.replace(`<@!${client.user.id}>`, prefix);
if (message.content.startsWith(`<@${client.user.id}>`))
  message.content = message.content.replace(`<@${client.user.id}>`, prefix);
    }
let args;


  if(message.content.toLowerCase().startsWith(prefix)){
    args = message.content.slice(prefix.length).split(/ +/);
    message.params = message.content.slice(prefix.length + args[0].length);
  }else{
  return;
}


//get the command
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
//verify if command exists
  if (!command) return;



//---------------------------------------
//-----REQUIREMENTS HANDLER----

//owner only
if (command.owner === true) {
if(message.author.id !== process.env.ownerID){
  try{
    message.react('<a:you_tried:933997991398866984>')
  }catch(err){
  }
  return;
}
}

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }



//cooldown
const { cooldowns } = client;
if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
const now = Date.now();
const timestamps = cooldowns.get(command.name);
let cooldownAmount = (command.cooldown || 1) * 1000;

if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
const cdTitles = client.arrays.get('cooldowns');

      const cdEmbed = new MessageEmbed()
      .setTitle(cdTitles[Math.floor(Math.random()*cdTitles.length)])
      .setDescription(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.\nRe-use the command <t:${Math.floor(expirationTime/1000)}:R>`)
      return message.reply({embeds:[cdEmbed]});
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.channel.send('there was an error trying to execute that command!');
  }



})


client.login(process.env['token']);

client.addItems = function(id, name, amount = 1){
  
let data = client.economy.get(`${id}.inv`);

if(data){

const hasItems = Object.keys(data).includes(name);

if(!hasItems){
  data[name] = amount;
}else{
  data[name] = data [name] + amount;
}

client.economy.set(`${id}.inv`, data);
}else{
client.economy.set(`${id}.inv`,{
  [name]: amount,
})
}
console.log(data);

return client.economy.get(`${id}.inv`)
}


