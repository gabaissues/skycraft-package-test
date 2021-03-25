const config = require('../../config.json')
const { onlyDevs } = require('../functions/onlyDevs.js')
const { client } = require('../../index.js')

module.exports = {
    name: 'message',
    run: async(message) => {

        if(message.author.bot) return;
        if(!message.guild) return;
        if(!message.content.startsWith(config.prefix)) return;
    
        if(!message.member) message.member = await message.guild.fetchMember()

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase()

        if(cmd.length === 0) return;
        var command = client.commands.get(cmd)
        
        if(!command) command = client.commands.get(client.aliases.get(cmd))
        
        if(command) {

            if(onlyDevs(message.author.id, command) === false) return message.reply('Comando apenas para desenvolvedores.')
            command.run(client, message, args)

        }


    }

}