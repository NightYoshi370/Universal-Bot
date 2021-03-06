module.exports = {
  name: ['textToUnicode', 'ttu', 'unicode'],
  usage: '<text>',
  desc: 'Converts characters to their unicode text codes',
  DM: true,
  permissions: [],
  exec(UnivBot, msg) {
    if (msg.args.length) {
      let message = '';
      for(let i=0;i<msg.args.length;i++) {
        message += '0x' + msg.args.charCodeAt(i).toString(16).padStart(4, '0') + ' ';
      }
      return msg.send(message);
    }
    return msg.send('I can\'t convert nothing...');
  }
};