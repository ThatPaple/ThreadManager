const Discord = require('discord.js');
const fs = require('fs');
const bannedWords = "data/bannedWords.txt";
const { colors } = require('../utils/config.json');

module.exports = {
	name: 'thread',
	description: 'Thread management command',
	aliases: ["th"],
	guildOnly: false,
	args: true,
	argList : ['create', 'delete', 'archive', 'unarchive', 'lock', 'unlock', 'list', 'about'],
	usage: '',
	execute: (message, args, client) => {
		message.delete();
		switch (args[0]) {
			case 'create':
				if (args[1] == null) {
					const createFembed = new Discord.MessageEmbed()
						.setTitle('**ARGUMENTS MISSING**')
						.setDescription(`Required Arguments : thread name`)
						.setColor(colors.error);
					return message.channel.send({ embeds: [createFembed] });
				} else {
					const thread = message.channel.threads.create({
						name: `${args.slice(1).join(" ")}`,
						autoArchiveDuration: 60,
						reason: `${message.author.tag} has created this thread.`,
					});
				}
				break;
			case 'delete':
				if (args[1] == null) {
					const createFembed = new Discord.MessageEmbed()
						.setTitle('**ARGUMENTS MISSING**')
						.setDescription(`Required Arguments : thread ID.\nRun tm.thread list to see available IDs.`)
						.setColor(colors.error);
					return message.channel.send({ embeds: [createFembed] });
				} else {
					
					const thread = client.guild.channels.cache.find(channel => {
						// CREATE CHANNEL DETECTION BASED ON ID
						for (var i = 0; i < nameSplit.length; i++) {
							if (bannedWordsList.includes(nameSplit[i]) && channel.isThread()) {
								channel.delete();
							}
						}
						});
				}
				break;
			case 'archive':
					/*
						This command should archive the thread based on thread ID.
						If ID is not provided, return an error embed.
					*/
				break;
			case 'unarchive':
				/*
					This command allows the user to unarchive the thread using the threads respected ID.
					This ID can be seen in tm.thread list, there should be an Archived and Current tab, like Discord.
				
				*/	
				break;
			case 'lock':
				/*
					Locks a thread to make it ADMINISTRATOR perm only. 
				
				*/
				break;
			case 'unlock':
				/*
					Unlocks threads using IDs
				*/
				break;
			case 'list':
				return message.channel.send("Yes")
				break;
			case 'about':
				
				// LIST INFO FROM https://discord.js.org/#/docs/main/stable/class/ThreadChannel
				  
				if (args[1] == null) {
					const aboutFembed = new Discord.MessageEmbed()
						.setTitle('**ARGUMENTS MISSING**')
						.setDescription(`Required Arguments : thread name`)
						.setColor(colors.error);
					return message.channel.send({ embeds: [aboutFembed] });
				} else {
					const thread = message.channel.threads.cache.find(x => x.name === `${args[1]}`);
					const aboutEmbed = new Discord.MessageEmbed()
						.setTitle(`**THREAD INFORMATION**`)
						.setDescription(`Thread Name : ${thread.name}\nTime Created : ${thread.createdAt}`)
						.setColor(colors.default);
					return message.channel.send({ embeds: [aboutEmbed] });
				}
				break;
			default:
				const defaultEmbed = new Discord.MessageEmbed()
					.setTitle('**ARGUMENTS MISSING**')
					.setDescription(`Required Arguments :\ncreate\ndelete\narchiven\nunarchive\nlock\nunlock\nlist\nauthor`)
					.setColor(colors.error);
				return message.channel.send({ embeds: [defaultEmbed] });
		}
	},
};