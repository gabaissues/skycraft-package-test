let config = require('../../config.json')

function onlyDevs(id, command) {

    if(command.onlyDevs === true) {

        let confirm = false

        for(let i in config.devs) {
    
            if(config.devs[i] === id) {
    
                confirm = true;
    
            }
    
        }
        
        return confirm

    } else {

        return true

    }


}

module.exports = { onlyDevs }