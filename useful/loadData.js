const { Collection } = require('discord.js');

const freezerConfig = require('../models/freezenick.js');
const blacklists = require("../models/blacklist.js");
module.exports = async (client) => {

client.freezer = new Collection();
client.blacklist = new Collection();

//loads all freezed nick users
    const freezedusers = (async ()=>{
	    const results = await freezerConfig.find();
        for (const result of results){
            client.freezer.set(result._id, result.nick);
        }
  console.log(`▩⇛  Loaded ${client.freezer.size} freezed nicks`);
    })();


//blacklisted users
    const blacklisted = (async ()=>{
        const results = await blacklists.find();
        for (const result of results){
          client.blacklist.set(result._id, result.reason);
        }
      console.log(`▩⇛  Loaded ${client.freezer.size} blacklisted users`);
    })();



}