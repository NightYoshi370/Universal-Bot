const Discord = require('discord.js');
module.exports = {
  name: 'about',
  usage: '',
  desc: 'Shows info about the bot',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    
    var modules = require('/app/package.json').dependencies;
    modules = Object.keys(modules);
    var link = 'https://discordapp.com/oauth2/authorize?client_id=618835289531613205&scope=bot&permissions=8';
    let embed = new Discord.RichEmbed()
      .setColor(8557055)
      .setDescription('**'+UnivBot.client.user.username+'** is a simple bot made for the Universal-Team')
      .setThumbnail(UnivBot.client.user.avatarURL)
      .setImage(UnivBot.client.user.avatarURL)
      .setURL(link)
      .setTitle(UnivBot.client.user.username+'\'s Information');
    embed.addField(':pencil2: Language used', '__**JavaScript**__ (Node.js)', true);
    embed.addField(':busts_in_silhouette: Coders', '__**Javier107**__, __**Pk11**__ and __**VoltZ**__', true);
    embed.addField(':bell: Add bot to server', '[Click here to invite]('+link+')', true);
    embed.addField(':clipboard: Database used', '**J**ava**S**cript**O**bject**N**otation', true);
    embed.addField(':satellite: Host used', '[glitch.com](https://glitch.com/)', true);
    embed.addField(':bulb: Amount of cmds', '__**'+UnivBot.cmds.length+'**__ Commands', true);
    embed.addField(':notebook_with_decorative_cover: Used modules', '**'+modules.join('**, **')+'**', true)
    embed.setFooter('• Coded using discord.js', UnivBot.client.user.avatarURL);
    return msg.send(embed);
    
  }
};