const fs = require('fs');
const Discord = require('discord.js');
function noRepeat(array) {
    let arr = [];
    for (var item of array) {
        if (!arr.includes(item))
            arr.push(item);
    };
    return arr;
};
module.exports = async (UnivBot) => {
  
  // Tell the console
  console.log(UnivBot.client.user.tag+' is ready');
  
  // Setup activities
  var status = UnivBot.client.guilds.size+' Servers | ?help';
  if (UnivBot.client.guilds.size == 1)
    status = UnivBot.client.guilds.size+' Server | ?help';
  UnivBot.client.user.setActivity("Booted!");
  setTimeout(() =>
    UnivBot.client.user.setActivity(status, {
      type: 'WATCHING'
    })
  , 3000);
  
  // Make collection of commands
  UnivBot.cmds = [];
  UnivBot.categories = fs.readdirSync('/app/commands/');
  for (var category of UnivBot.categories) {
    var commands = fs.readdirSync('/app/commands/'+category).filter(cmd => cmd.endsWith('.js'));
    for (var command of commands) {
      UnivBot.cmds.push('/app/commands/'+category+'/'+command);
    };
  };
  
  // Detect reboot
  if (UnivBot.db.reboot) {
    var reb = UnivBot.db.reboot;
    if (!reb.guild) {
      console.log(reb.author)
      var user = UnivBot.client.users.get(reb.author);
      var channel = await user.createDM();
      var time = Math.abs((new Date().getTime() - reb.start) / 1000);
      var msg = channel.fetchMessage(reb.msg)
      msg.then(msg => {
          msg.edit('Done rebooting! It took '+time+' seconds');
          UnivBot.db.reboot = undefined;
          fs.writeFileSync('/app/database.json', JSON.stringify(UnivBot.db, null, 4));
      })
      msg.catch(() => {
          user.send('Done rebooting! It took '+time+' seconds');
          UnivBot.db.reboot = undefined;
          fs.writeFileSync('/app/database.json', JSON.stringify(UnivBot.db, null, 4));
      });
    } else {
      var guild = UnivBot.client.guilds.get(reb.guild);
      var channel = guild.channels.get(reb.channel);
      var time = Math.abs((new Date().getTime() - reb.start) / 1000);
      var msg = channel.fetchMessage(reb.msg)
      msg.then(msg => {
          msg.edit('Done rebooting! It took '+time+' seconds');
          UnivBot.db.reboot = undefined;
          fs.writeFileSync('/app/database.json', JSON.stringify(UnivBot.db, null, 4));
      })
      msg.catch(() => {
          channel.send('Done rebooting! It took '+time+' seconds');
          UnivBot.db.reboot = undefined;
          fs.writeFileSync('/app/database.json', JSON.stringify(UnivBot.db, null, 4));
      });
    };
    
  };
};