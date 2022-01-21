const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'roles',
    description: 'take self-roles in a swaggy way',
    async execute(message) {

let member = message.member;
const roles = [
  [
{"title":"Ping Roles","description":"<@&853941053689430037>\n`Get pinged for giveaways above 3mil DMC`","image":{"url":"https://cdn.discordapp.com/attachments/927455072709914635/927895937270046770/1.png"},"author":{"name":"Heroez"},"color":7498,"footer":{"text":"Use buttons to navigate"}},
{"title":"Ping Roles","description":"<@&853940928879656960>\n`Dank Memer heists will ping this role`","image":{"url":"https://cdn.discordapp.com/attachments/927455072709914635/927895937903366154/2.png"},"author":{"name":"Heroez"},"color":7498,"footer":{"text":"Use buttons to navigate"}}
]
]
let currentRole = roles[0][0];
let ro = message.guild.roles.cache.get(currentRole.description.split("\n").shift());
console.o
console.log(ro)

const rolesSwitch = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("fakeButtonright")
					.setStyle('SECONDARY')
          .setLabel(" ")
          .setDisabled(true),
        new MessageButton()
					.setCustomId("backType"+message.id)
					.setStyle('PRIMARY')
          .setLabel("back"),
        new MessageButton()
					.setCustomId("nextType"+message.id)
					.setStyle('PRIMARY')
          .setLabel("next"),
          new MessageButton()
					.setCustomId("fakeButtonleft")
					.setStyle('SECONDARY')
          .setLabel(" ")
          .setDisabled(true),
			);


message.reply({embeds:[currentRole], components:[editButtons(message, message.member.roles.cache.has(ro)), rolesSwitch]})
    }
}

async function editButtons(message, hasRole){
console.log(hasRole)
const navi = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId("back"+message.id)
  .setEmoji("927452395817021510")
  .setStyle("SECONDARY"),
    new MessageButton()
  .setCustomId("claim"+message.id)
  .setLabel(hasRole ? "  REMOVE ROLE  " : "   ADD ROLE   ")
  .setStyle(hasRole ? "DANGER" : "SUCCESS"),
  new MessageButton()
  .setCustomId("next"+message.id)
  .setEmoji("927452493569490954")
  .setStyle("SECONDARY"),
)
return navi
}