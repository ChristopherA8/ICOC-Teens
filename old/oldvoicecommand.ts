/*

/////////////////////////////////////////////////

  

  //const connection = await voice.member.voice.channel.join();
  const fs = require('fs');
  const ytdl = require('ytdl-core-discord');
  const { apiurl } = require('ytsearcher');
  const { YTSearcher } = require('ytsearcher');
  const searcher = new YTSearcher('AIzaSyD17RIpNF723buQZ9gsdOWDoq4BGpHDIb0');

  var usrInput = voice.content.substr('5').trim();
  let result = await searcher.search(usrInput);
  //voice.channel.send(usrInput + '\n' + result.first.url);

  // Create a dispatcher
  //const dispatcher = connection.play('https://www.youtube.com/watch?v=xGtyOPC3mEA'); , { quality: 'highestaudio' }
  //const dispatcher = connection.play(await ytdl('https://www.youtube.com/watch?v=xGtyOPC3mEA'), { type: 'opus' }, {quality: 'lowest' });
  //https://www.youtube.com/watch?v=HRW9W7ZtOEI
  //const dispatcher = connection.play(await ytdl('https://www.youtube.com/watch?v=HRW9W7ZtOEI'), { type: 'opus' }, {quality: 'lowest' });


//////////////////////////////////////////

  if (voice.content.startsWith(`${prefix}play`)) {
  
    // Play only if user is in vc
    if (voice.member.voice.channel) {

      const connection = await voice.member.voice.channel.join();

      const dispatcher = connection.play(await ytdl(result.first.url), { type: 'opus' }, {quality: 'highest' });
      
      dispatcher.on('start', () => {
          voice.channel.send(`**Now playing:** ` + result.first.url);
      });
  
      dispatcher.on('finish', () => {
          //voice.channel.send('Song has finished playing!');
          connection.disconnect();
      });
  
      // Always remember to handle errors appropriately!
      dispatcher.on('error', console.error);
  
      }
  }

  if (voice.content == `${prefix}stop`) {
      const connection = await voice.member.voice.channel.join();
      connection.disconnect();
  }
  

*/