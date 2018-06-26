const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const cmds =  require('./commands.js');
const tool = require('./tool.js');
const prompt = require('prompt');
const colors = require('colors');
prompt.message = "";
prompt.delimiter = '';

var prefix = config.prefix;

client.on('ready', () => {
  console.log(`Bot ready in ${client.guilds.size} server!`);
  client.user.setGame(`${prefix}help`)
});

client.on('guildMemberAdd', member => {
	console.log('+1 user');
	const channel = member.guild.channels.find('id', '460823231490686977');
	if (!channel) return;
	channel.send(`Hey ${member}, bienvenue sur **${member.guild.name}**, nous t'invitons à regarder les règle dans le **#${member.guild.channels.get('460568468085932032').name}** pour ne pas avoir de problème sur le serveur ! 🤗 🎉`);
});

client.on('guildMemberRemove', member => {
	console.log('-1 user');
	const channel = member.guild.channels.find('id', '460823231490686977');
	if (!channel) return;
	channel.send(`Dommage ${member}, a quitté le serveur Enosia !`);
});

client.on('message', msg => {
	if(msg.content === prefix + 'help'){
		const embed = new Discord.RichEmbed()
  			.setAuthor("Enosia", "https://orig00.deviantart.net/c146/f/2016/345/5/e/discord_honeycomb_icon_by_benjii00-darboma.png")
            .setColor(0x00AE86)
  			.setFooter("Enosia", "https://orig00.deviantart.net/c146/f/2016/345/5/e/discord_honeycomb_icon_by_benjii00-darboma.png")
			.setTimestamp()
            .addField("=help", "Commande d'aide du bot !")
  			.addField("=règlement", "Vous envoit le règlement du serveur !", true)
  			.addBlankField(true);
			  
			  msg.author.sendMessage(embed);
			  msg.react('✅');
	}

	if(msg.content === prefix + 'règlement'){

	}

});


client.on('message', msg => {
    if (msg.author.bot || msg.channel.type != 'text')
        return; // Do not respond to messages from bots or messages that are not from guilds.

    if (!msg.content.startsWith(config.prefix))
        return; //Not a command.

    let cmd = msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
    getCmdFunction(cmd)(msg);
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
// bot.on('debug', (e) => console.info(e));

client.login(config.token);

function getCmdFunction(cmd) {
    const COMMANDS = {
	    'ban': cmds.ban,
        'choose': cmds.choose,
        'help': cmds.help,
        'debug': cmds.debug,
        'kick': cmds.kick,
        'prune': cmds.prune,
        'music': music.processCommand,
    }
    return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}
