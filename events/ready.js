
const db = require("quick.db");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {


//quick.db / sql
client.db = require("quick.db");
client.economy = new db.table("economy")

//console
console.log(`
◸≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡◹
◧                                             ◨
◧           Logged in as ${client.user.tag}             ◨
◧           ID: ${client.user.id}            ◨
◧          Never gonna give you up!           ◨
◧                                             ◨
◺≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡◿
`)

//activity
client.user.setPresence({
    activities: [{ name: `${process.env.prefix}help`, type: 'STREAMING', url:"https://www.twitch.tv/twitch" }],
  });

  }
};


