const prefix = process.env.PREFIX;
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['cmds','commands','cmd'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { commands } = message.client;
    const client = message.client;
let categories = {
  'currency':[], 'utility':[],
  'fun':[], 'config':[],
  'games':[], 'text':[]
}

let emojis = {
  'currency':"💰", 'utility':"⚒️",
  'fun':"😄", 'config':"⚙️",
  'games':"🎲", 'text':"🆗"
}

commands.forEach(comd => {
  if(!comd.owner) categories[`${comd.category}`].push(comd.name);
 }
)

		if (!args.length) {

 const mainHelp = new MessageEmbed()
 .setColor("RANDOM")
 .setTitle(client.user.username)
 .setDescription(
   "See `sis about` for info on the bot. If you have any suggestions, use `sis suggest` to send in your ideas to us directly. Links: [Support](https://discord.com/users/773534174547279873) | [Community](https://discord.gg/Q2dtA7Vtsz)")
 .addFields(
		{ name: '💰 Currency', value: "`sis help currency", inline: true },
		{ name: '⚒️ Utility', value: "`sis help utility", inline: true },
		{ name: '😄 Fun', value: "`sis help fun", inline: true },
		{ name: '⚙️ Config', value: "`sis help config", inline: true },
		{ name: '🎲 Games', value: "`sis help games", inline: true },
		{ name: '🆗 Text', value: "`sis help text", inline: true }
	)
 .setThumbnail(client.user.displayAvatarURL({default:true}))
.setFooter("sis about | Newest commands: sis "+ process.env.latestCmd)

			return message.channel.send({embeds:[mainHelp]});
		}


if(categories[args[0].toLowerCase()]){
  const subHelp = new MessageEmbed()
  .setColor("RANDOM")
  .setTitle(emojis[args[0].toLowerCase()]+" "+ args[0].toLowerCase() + " Commands")
  .setDescription("`" + categories[args[0]].join("`, `") + "`")
  .setFooter("Total: "+categories[args[0]].length, message.guild.iconURL())
return message.channel.send({embeds:[subHelp]})
}


		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command || command.owner) {
            const invaildEmbed = new MessageEmbed()
	        .setColor('RANDOM')
			.setTitle("Doesn't exist")
      .setDescription("That's not a valid command or category.\n\nUse `​sis help category/command`​, example:\n`​sis help currency`​ | `​sis help rps`​")
      .setFooter("use sis help for more info!", message.guild.iconURL())
			return message.channel.send({embeds:[invaildEmbed]});
		}




		var deepHelp = new MessageEmbed()
    .setColor("RANDOM")
		.setAuthor("Requested by "+message.author.tag, message.author.displayAvatarURL())
		.setTitle("Help")
    .addField('Category', command.category)
    .addField(command.name, "<a:rightPointer_sis:928253377178120193> "+command.description)

    if(command.usage) deepHelp.addField('Usage:', `\`${prefix}${command.name} ${command.usage}\``)
  
    if(command.aliases) deepHelp.addField('Aliases',"`"+command.aliases.join('`, `')+"`, `"+ command.name + "`")

    .addField('Cooldown', (command.cooldown ? command.cooldown : 3)+'s');

		message.channel.send({embeds:[deepHelp]});
	},
};