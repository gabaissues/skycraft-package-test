require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

module.exports = { client }

/* Por que dois arquivos para conter itens de configuração?

.env Ficaraá na host local, sendo assim, não será upado para coisas como, github, host ou coisas do gênero. Para preservar a segurança, o arquivo
config.json será utilizado para armazenar configurações que você mesmo poderá alterar, como desenvolvedores, prefix. O config.json é útil para usuários que desejam
vender seus bots, config.json seria uma boa forma de o cliente configurar seu bot.

*/

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

const { createCore } = require('./src/functions/core.js')

createCore(client).then(() => {

    console.log('[core] Finalizando processos...')

}).catch(e => {

    console.log('[index] Ocorreu um erro ao iniciar o CORE.')
    console.log(e)

})

client.login(process.env.TOKEN)