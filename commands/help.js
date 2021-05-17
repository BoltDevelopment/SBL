const Discord = require('discord.js')
exports.run = (client, message, args) => {
  const prefix = process.env.prefix
  const embed = new Discord.MessageEmbed()
    .setTitle("Help")
    .setDescription("Protecting Servers")
    .setFooter(client.user.tag, client.user.avatarURL({dynamic: true}))
    .addFields(
		{ name: 'Commands', value: `\`${prefix}syncbans\` | Syncs all bans with the current ban database\n\`${prefix}help\` | Sends all commands\n\`${prefix}report\` | Sends a user report to the system server\n\`${prefix}blacklist\` | Adds a user to the blacklist database\n\`${prefix}unblacklisted\` | Removes a user to the blacklist database\n` },
	)
  message.channel.send(embed)
}