var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var model = 'https://api.projectoxford.ai/luis/v1/application?id=dccc76e2-4b82-4a7d-b1ae-750028c8646c&subscription-key=f7b72ec7720c4063bbda19446c55ca9e'
var bot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });
var dialog = new builder.LuisDialog(model);
bot.add('/', dialog);

// Setup Restify Server
var server = restify.createServer();
server.get('.*', restify.serveStatic({
  directory: __dirname,
  default : 'index.html'
    }));

dialog.on('brief',builder.DialogAction.send('breif'));
dialog.on('detailedQuesion',builder.DialogAction.send('detailedQuestion'));
dialog.on('culture',builder.DialogAction.send('culture'));
dialog.on('story',builder.DialogAction.send('story'));
dialog.on('people',builder.DialogAction.send('people'));
dialog.onDefault(builder.DialogAction.send("None"));

server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 9000, function () {
    console.log('%s listening to %s', server.name, server.url); 
});

