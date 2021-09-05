module.exports = {
	name: 'test',
	description: 'Ping test command',
	aliases: [],
	guildOnly: false,
	args: false,
	usage: '',
	execute:(message, args, client) => {
		message.reply('If this command executes successfully, Thread Manager is connected to Disocrd.');
	},
};