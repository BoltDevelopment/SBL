const { MessageEmbed } = require('discord.js')
const db = require('quick.db') // for testing purposes
exports.run = (client, message, args) => {
  const loadingEmbed = new MessageEmbed()
    .setTitle("Error")
    .setDescription("Unable to complete operation. | System under maintenance.")
    .setColor("RED")
    .setFooter(client.user.tag, client.user.avatarURL({dynamic: true}))
    
  message.channel.send(loadingEmbed)
  
  const stuff = db.all()
  stuff.forEach((item, index) => {
    if(item.ID == 'blacklisted') {
      console.log('e')
      var userArr = item.data
      userArr.forEach((item, index) => {
        var member = message.guild.members.cache.get(item)
        try {
        member.ban(`Banned by ${client.user.tag}`)
      } catch(e) {
        message.channel.send(`There was an error banning ${member.user.tag}`)
      }
      })
    }
  })
}

