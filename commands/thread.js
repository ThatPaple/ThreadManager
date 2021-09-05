module.exports = {
    name: 'thread',
    description: 'Thread management command',
    aliases: ["th"],
    guildOnly: false,
    args: false,
    usage: '',
    execute: (message, args, client) => {
        switch (args[0]) {
			case 'add':
				
				break;
			case 'remove':
			
				break;
			case 'list':
			
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