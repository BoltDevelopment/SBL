const Discord = require('discord.js')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('READY')
})

app.listen(port, () => {
  console.log(`Web Ready`)
})
const client = new Discord.Client({disableMentions: "everyone"})
const fs = require('fs')

var commandlist = [];

fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = require(`./commands/${file}`);
        commandlist.push({
            file: commandFile,
            name: file.split('.')[0]
        });
        console.log(`Loaded s!${file.split('.')[0]} command`)
    });
});

client.on('ready', async () => {
  console.log('Client ID: ' + client.user.id)
  console.log(client.user.tag + ' is ready!');
  client.generateInvite({
  permissions: ['ADMINISTRATOR'],
}).then(link => console.log(`Generated bot invite link: ${link}`))
  const user = client.user;
  setInterval(() => {
    const statuses = [
        `over ${client.guilds.cache.size} servers.`,
    ]

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, { type: "WATCHING"})
}, 20000)
})
client.on('message', (message) => {
    if(message.author.bot) return;
    if (message.content.startsWith(`<@!${client.user.id}>` || `<@${client.user.id}>`)) return message.channel.send('My prefix is `' + process.env.prefix + '`' + ` | I am made by ${client.users.cache.find(user => user.id === '722540557460570224')
.tag}`).then(function() {
      console.log(`${message.author.tag} mentioned me.`)
    })
    if(!message.content.startsWith(process.env.prefix)) return;
    if(message.channel.type === 'dm') return message.author.send('**Error: **Commands can not be used in dms.').then(function() {
      console.log(`${message.author.tag} tried to use a command in dms.`)
    })
    const args = message.content.slice(process.env.prefix.length).split(' ');
    const commandName = args[0].toLowerCase();
    args.shift();
    const command = commandlist.findIndex((cmd) => cmd.name === commandName);
    if(command == -1) return;
    try {
    commandlist[command].file.run(client, message, args);
    } catch(e) {
      message.channel.send('There was an error')
      console.log(e)
    }
})
client.login(process.env.TOKEN)
