module.exports = {
	name: 'test',
	description: 'Ping test command',
	aliases: [],
	guildOnly: false,
	args: false,
	usage: '',
	execute:(message, args, client) => {
		message.delete();
		message.channel.send('If this command executes successfully, Thread Manager is connected to Discord.');
	},
};