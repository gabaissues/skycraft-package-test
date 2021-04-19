const Discord = require('discord.js')
const skycraft = require('skycraft')

module.exports = {
    name: 'ranking',
    aliases: ['ranking'],
    description: 'Mostra o ranking do skycraft',
    onlyDevs: false,
    run: async(client, message, args) => {

        var msg = await message.reply('Atualizando ranking, aguarde até 3 segundos...')

        //Iniciando o módulo do skycraft, para o processo de mensagem ser mais rápido, é só criar um arquivo separado na pasta services e inicializar lá o skycraft.

        skycraft.start({ show: false }).then(async (response) => {

            //Buscando a página
            let result = await skycraft.searchPage({ response: response, minigame: 'blockparty', page: 1, temporada: 'mensal' })
            
            //Váriavel aonde conterão os dados formatados
            let format = []

            //Formatando todos os dados
            result.forEach(x => {

                format.push(`**${x[0]}・** ${x[1]}, vitórias: ${x[2]}`)

            })

            //Enviando para o usuário
            var embed = {
                title: '🏆 ⋅ Ranking do BlockParty',
                description: format.join('\n'),
                color: 'PURPLE'
            }

            msg.edit({ embed: embed })

        })

    } 
}