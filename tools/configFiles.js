const fs = require('fs');
const colors = require('colors');
const shell = require('shelljs');

const { _dirDb } = require('../config/routes');

let paramsInt = [];

const readDirectory = (directory) => {
    console.log('Reding directory: '.green ,directory.blue);
    fs.access(_dirDb, (err) => {
        if(err){
            console.log('Creating data bases directory :'.green, _dirDb.blue);
            shell.exec('mkdir db');
        }
    })

    fs.readdir(directory, (err, file) => {
        if (err) throw new Error('No such file or directory'.red, err);
        file.forEach(fileName => {
            readJsonFiless(directory+fileName);
            saveConfigFiles(fileName);
        });
    });
}


const readJsonFiless = (dataJson) => {
    let data = fs.readFileSync(dataJson);
    let objectData = JSON.parse(data);
    if(objectData.nivelCero){
        readSyntax(objectData.nivelCero.sintaxis);
    }else{
        return new Error('File dont support')
    }
}

const readSyntax = (sintaxis) => {
    sintaxis.forEach(params => {
        configParam(params);
    })
}

const configParam = (param) => {

    let newParams = {
        valorDefecto: null,
        editable: true,
        visible: true,
        nombre: param.param,
        tipo: param.tipoparam,
        descripcion: param.descripcion,
        inputIntf: null
    }
    newParams.inputIntf = genInput(newParams);
    paramsInt.push(newParams);
}

const genInput = (param) => {

    let input = '';

    switch(param.tipo){
        case 'int':
            input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='number' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        case 'string':
            input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='text' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        case 'float':
            input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='number' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        case 'double':
            input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='number' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        case 'boolean':
            input = `
            <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" name="${param.nombre}">
            <label class="form-check-label" for="${param.nombre}">${param.nombre}</label>
            </div>
            `
            //input = `<div class="custom-control custom-switch"> <input type="checkbox" class="custom-control-input" name="_${param.nombre}"> <label class="custom-control-label" for="${param.nombre}">${param.descripcion}</label> </div>`
            break;
        case 'date':
            break;
        case 'rout':
            input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='text' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        case 'rout_bin':
            input = input = `<div class='form-group'> <label for='${param.nombre}'>${param.nombre}</label> <input type='text' class='form-control' name='${param.nombre}'> <small id='${param.nombre}' class='form-text text-muted'>${param.descripcion}.</small> </div>`
            break;
        default:
            input = param.tipo
            break;
    }

    return input;
}

const saveConfigFiles = (file) => {
    let data = JSON.stringify(paramsInt);
    let name = file.split('.');
    let nameConfig = _dirDb+name[0]+'.config.json';

    fs.writeFile(nameConfig,data, (err) => {
        if (err) throw new Error('Can not be saved'.red, err)

        let numPrams = paramsInt.length-2 + ' graphics elements';

        console.log('\n----- Report of file -----'.yellow);
        console.log('File name: '.yellow,file.yellow);
        console.log('Graphics elements:'.yellow, numPrams.yellow);
        console.log('Saved configuration file in :'.yellow,nameConfig.yellow);
        console.log('--------------------------\n'.yellow);
        
    })

}

module.exports = {
    readDirectory
}
