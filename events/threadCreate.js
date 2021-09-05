const { Channel, Message, ThreadManager, ThreadChannel } = require("discord.js");
const fs = require('fs')
const bannedWords = "data/bannedWords.txt";

module.exports = {
    event: 'threadCreate',
    once: false,
    run(client, message) {

        const bannedWordsList = fs.readFileSync(`${bannedWords}`, 'utf8');
        const arr = bannedWordsList.toString().replace(/\r\n/g, '\n').split('\n');

        const thread = client.guild.channels.cache.find(channel => {
            const nameSplit = (channel.name).split(" ");
            for (var i = 0; i < nameSplit.length; i++) {
                if (bannedWordsList.includes(nameSplit[i]) && channel.isThread()) {
                    channel.delete();
                }
            }
            });
    },
};


