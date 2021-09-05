const Discord = require('discord.js');
const fs = require('fs');
const bannedWords = "data/bannedWords.txt";
const { colors } = require('../utils/config.json');

module.exports = {
	name: 'filter',
	description: 'This command allows you to configure your thread name filter.',
	aliases: ['fil'],
	guildOnly: false,
	args: false,
	usage: '',
	execute: (message, args, client) => {
		switch (args[0]) {
			case 'add':
				if (args[1] == null) {
					const addFEmbed = new Discord.MessageEmbed()
						.setTitle('**ARGUMENTS MISSING**')
						.setDescription(`Required Arguments : Input for word filter`)
						.setColor(colors.error);
					return message.channel.send({ embeds: [addFEmbed] });
				} else {
					fs.appendFileSync(`${bannedWords}`, `${args.slice(1).join(" ")}\n`);
					const addSEmbed = new Discord.MessageEmbed()
						.setTitle('**SUCCESS!**')
						.setDescription(`Added ${args.slice(1).join(" ")} to the banned thread names.`)
						.setColor(colors.default);
					return message.channel.send({ embeds: [addSEmbed] });
				}
				break;
			case 'remove':
				if (args[1] == null) {
					const remFEmbed = new Discord.MessageEmbed()
						.setTitle('**ARGUMENTS MISSING**')
						.setDescription(`Required Arguments : Position for removal.`)
						.setColor(colors.error);
					return message.channel.send({ embeds: [remFEmbed] });
				} else {
					const bannedWordsList = fs.readFileSync(`${bannedWords}`, 'utf8');
					const arr = bannedWordsList.toString().replace(/\r\n/g, '\n').split('\n');
					const deletedWord = arr[args[1]];
					console.log("arr " + arr.length)
					console.log(args[1])
					if (arr.length == 1 || args[1] >= arr.length - 1) {
						const remFEFmbed = new Discord.MessageEmbed()
							.setTitle('**ERROR!**')
							.setDescription(`Array is empty or position does not exist!\nRun \`\`tm.filter list\`\` to get a list of positions`)
							.setColor(colors.error);
						return message.channel.send({ embeds: [remFEFmbed] });
					} else {
						delete arr[`${args[1]}`];
						fs.truncate(`${bannedWords}`, 0, function () { })
						var filtered = arr.filter(function (el) { return el; });

						const writeStream = fs.createWriteStream(`${bannedWords}`);

						filtered.forEach(value => writeStream.write(`${value}\n`));

						writeStream.end();

						const remSEmbed = new Discord.MessageEmbed()
							.setTitle('**SUCCESS!**')
							.setDescription(`Removed ${deletedWord} from the banned thread names.`)
							.setColor(colors.default);
						return message.channel.send({ embeds: [remSEmbed] });
					}
				}
				break;
			case 'list':
				const bannedWordsList = fs.readFileSync(`${bannedWords}`, 'utf8');
				const arr = bannedWordsList.toString().replace(/\r\n/g, '\n').split('\n');
				let clean = "";

				for (let i = 0; i < arr.length - 1; i++) {
					clean = clean + `${i}. ${arr[i]}\n`
				}

				const listEmbed = new Discord.MessageEmbed()
					.setTitle('**BANNED WORD LIST**')
					.setDescription(`${clean}`)
					.setColor(colors.default);
				return message.channel.send({ embeds: [listEmbed] });
				break;
			default:
				const defaultEmbed = new Discord.MessageEmbed()
					.setTitle('**ARGUMENTS MISSING**')
					.setDescription(`Required Arguments : add\nremove\nlist`)
					.setColor(colors.error);
				return message.channel.send({ embeds: [defaultEmbed] });
		}
	},
};