const fs = require('fs')

async function createCore(client) {

    console.log('[core] Iniciando bot...')
    
    function events() {

            console.log('[events] Carregando eventos...')

            fs.readdirSync('./src/events').forEach(x => {
                
                const events = require(`../events/${x}`)
                if(events.name) {

                    const emitter = (typeof events.emitter === 'string' ? client[events.emitter] : events.emitter) || client; 

                    try {

                        console.log(`[events] Evento carregado com sucesso, ${x}`)
                        emitter['on'](events.name, (...args) => events.run(...args));

                    } catch(e) {

                        console.log(`[events] Ocorreu um erro ao carregar, ${x}`)
                        console.log(e)

                    }

                } else {

                    console.log(`[events] Ocorreu um erro ao carregar, ${x}`)

                }
                
            })

    }

    function handler() {

            console.log('[handler] Carregando comandos...')

            fs.readdirSync("./src/commands/").forEach(x => {

                const commands = fs.readdirSync(`./src/commands/${x}/`).filter(arq => arq.endsWith(".js"));
                
                for (let i of commands) {

                    let arq = require(`../commands/${x}/${i}`);

                    if(arq.name) {

                        client.commands.set(arq.name, arq)
                        console.log(`[commands] Comando carregado com sucesso, ${i}`)

                    } else {

                        console.log(`[commands] Ocorreu um erro ao carregar, ${i}`)
                        
                    }

                    if(arq.aliases && Array.isArray(arq.aliases)) arq.aliases.forEach(x => client.aliases.set(x, arq.name))


                }


            })

    }

    handler()
    events()

}

module.exports = { createCore }