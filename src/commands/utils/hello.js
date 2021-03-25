const Discord = require('discord.js')

module.exports = {
    name: 'hello',
    aliases: ['hello'],
    description: 'Primeiro comando para exemplificar meu template, use do jeito que quiser :)',
    onlyDevs: true,
    run: async(client, message, args) => {

        console.log('Hello World!')

    } 
}