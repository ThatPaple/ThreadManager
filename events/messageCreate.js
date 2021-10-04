const { prefix } = require('../utils/config.json');
const fs = require('fs')
const bannedWords = "data/bannedWords.txt";

module.exports = {
	event: 'messageCreate',
	run: (message, client) => {

		/*
		Extension to threadCreate.js
		There was no way to deal with this in that file, I don't know.. I might not know what I'm doing.
		*/

		if (message.type === "THREAD_CREATED") {
			const bannedWordsList = fs.readFileSync(`${bannedWords}`, 'utf8');
			const nameSplit = (message.content).split(" ");
			for (var i = 0; i < nameSplit.length; i++) {
				if ((bannedWordsList.toLowerCase()).includes(nameSplit[i].toLowerCase())) {
					message.delete();
				}
			}
		}

		//Implement modlogs

		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName),
			);
		if (!command) return;
		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}
		try {
			command.execute(message, args, client);
		}
		catch (error) {
			console.error(error);
			message.reply('There was an error trying to execute that command!');
		}
	},
};