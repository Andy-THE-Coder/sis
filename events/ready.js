
module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {


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


