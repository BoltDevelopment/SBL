const db = require('quick.db')
exports.run = (client, message, args) => {
  eval(args.join(' '))
}