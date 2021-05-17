const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
const filter = (m) => m.author.id === message.author.id
  let m1 = message.channel.send(new MessageEmbed()
  .setAuthor(client.user.tag, client.user.avatarURL({dynamic: true}))
  .setTitle('Report Prompt')
  .setDescription('Alright, you are wanting to report someone. What is the user ID of the person you want to report.')
  .setColor('YELLOW')
  .setFooter('Say \'cancel\' to cancel this prompt')
  )
  const firstMArray = await message.channel.awaitMessages(filter, {max: 1})
  const first = firstMArray.first()
  canceled = check(first)
  if(canceled == true) return
  console.log(first.content)
  message.channel.send('cool')
}
function check(m) {
  if(m.content == "cancel") {
    m.author.send(new MessageEmbed()
      .setAuthor(m.guild.name, m.guild.iconURL({dynamic: true}))
      .setTitle('Report Prompt')
      .setDescription('Alright, canceled.')
      .setColor('RED')
    )
    return true
  } else {
    return false
  }
}