const fs = require('fs');
const Discord = require('discord.js')
const db = require("quick.db");

const freezenick = require('../../models/freezenick');

module.exports = {
	name: 'eval',
	description: 'Evaluate code from discord', 
  aliases: ['evaluate','run','e'],
  owner: true,
   async execute(message, args, client) {
// || args.join('').includes(".delete(")

      const secret = /process.env/i;
      const isMatch = args.some(arg => arg.match(secret));
      if (isMatch || args.join('').includes(".ban(") || args.join('').includes(".kick(") || args.some(arg => arg.match("client.token"))) return message.channel.send("U can't defeat my master code!!!")


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}



    try {
         const code = args.join(" ");
      	let evaled = eval(code);
	if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled;
      	if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });

evaled = Discord.Formatters.codeBlock("md", clean(evaled))

message.channel.send({ content: evaled, split: true }).catch(err=>{
  console.log(evaled); 
  message.channel.send("Results were logged in the console.");
  })
    } catch (err) {
      return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    } 


   }
}