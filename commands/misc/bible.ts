module.exports = {
	name: 'bible',
    description: 'bible api',
	execute(msg) {

        const fetch = require('node-fetch');
        
        var input = msg.content;
        var author = msg.author;
        var usrInput = input.substr('6');
        var splitInput = usrInput.split(" ");
        var book = splitInput[1];
        var chapter = splitInput[2];
        var verse = splitInput[3];
        var verse2 = splitInput[4];


        if (verse2 == null) {
            var url = 'https://bible-api.com/' + book + "+" + chapter + ':' + verse;
         } else {
             var url = 'https://bible-api.com/' + book + "+" + chapter + ':' + verse + '-' + verse2;
        }
        

        fetch(url)
        .then(res => res.json())
        .then((out) => {

        var api = out;
        if (api.text == null) {
            msg.reply("Format Error: !bible <book> <chapter> <verse>\n or verse not found");
        } else {
            msg.channel.send(api.text);

        }

        })
        .catch(err => { throw err });

        //var url = 'https://bible-api.com/' + book + "+" + chapter + ':' + verse + '-' + verse2 + "?translation=" + version;


   
    }
};