const argv = require('./config/yargs').argv;
const fs = require('fs');
const colors = require('colors');

const { readDirectory } = require('./tools/configFiles');
const { readConfigFiles } = require('./tools/intfzFiles');
const { generatedInterface } = require('./tools/genIntfz');

const { _dirData, _dirDb } = require('./config/routes');

let comando = argv._[0];

switch ( comando ) {
    case 'make':
        console.log('Command'.green,' make'.blue,'running'.green);
        
        if (argv.r) {
            readDirectory(argv.r);
        } else {
            readDirectory(_dirData)
        }
        break;
    case 'config':
        console.log('Command'.green,' config'.blue,'running'.green);
        fs.access(_dirDb, (err) => {
            if(err){
                console.log('The database doesnt exist run:'.red,'node app.js make'.italic,'and try again'.red);
            }else{
                readConfigFiles(_dirDb);
            }
        })
        break;
    case 'gen':
        console.log('Command'.green,' gen'.blue,'running'.green);
        generatedInterface();
        break;
    default:
        console.log('Funcion no definida');
        break;
}