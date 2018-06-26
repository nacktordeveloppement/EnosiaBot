const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const streamOptions = { seek: 0, volume: 1 };
const broadcast = client.createVoiceBroadcast();

var prefix = '=';
var start = false;

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

	if (!msg.guild) return;
	let args = msg.content.split(' ');
	if(msg.content.startsWith('=play') && start) return msg.reply('music déja lancé !');

	if (msg.content.startsWith('=play')) {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => {
		  msg.reply('lancement...');
		  start = true;
		  let args = msg.content.split(' ');
		  const stream = ytdl(args[1], { filter : 'audioonly' });
		  broadcast.playStream(stream);
		  const dispatcher = connection.playBroadcast(broadcast);
        })
        .catch(console.log);
    } else {
      msg.reply('Vous devez d\'abort rejoindre un channel!');
    }
  }

  if(msg.content === '=stop'){
	  start = false;
	  broadcast.end();
  }

});

client.login(process.env.TOKEN);
