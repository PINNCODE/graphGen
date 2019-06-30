const make = {
    demand : false,
    alias : 'r',
    desc : 'Rout of carnet files'
}

const config = {
    demand : false,
    alias : 'p',
    desc : 'Server port'
}

const gen = {
    demand : false,
    alias : 'p',
    desc : 'Server port'
}


const argv = require('yargs')
            .command(
                'make',
                'Start the process of configuration files of interfaceAñade una descripcion a la tarea',
                {
                    make
                }
            ).command(
                'config',
                'Generate config files of interface',
                {
                    config
                }
            ).command(
                'gen',
                'Generate interface and config the server',
                {
                    gen
                }
            )
            .help()
            .argv;

module.exports = {
    argv
}