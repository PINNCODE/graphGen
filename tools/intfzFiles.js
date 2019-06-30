const fs = require('fs');

let graphicElements = [];

const readConfigFiles = (directory) => {
    console.log('Reding directory: '.green ,directory.blue);
    console.log('Loading data ...'.green);
    loadingDB();
    fs.readdir(directory, (err, file) => {
        if (err) throw new Error('No such file or directory'.red, err);
        file.forEach(fileName => {
            if (fileName != 'GenIntfz.json') {
                readConfigFiless(directory+fileName)
            }
        });
    });
}

const readConfigFiless = (dataJson) => {
    let data = fs.readFileSync(dataJson);
    let objectData = JSON.parse(data);
    
    savedGraphicElements(objectData);
    savedInGenIntfz(dataJson,objectData);  
}

const savedGraphicElements = (elements) => {
    elements.forEach( element => {
        graphicElements.push(element.inputIntf);
    })
}

const savedInGenIntfz = (fileName, obj) => {

    graphicElements.push()
    let data = JSON.stringify(graphicElements);

    fs.writeFile('./db/GenIntfz.json',data, (err) => {
        if (err) throw new Error('Could not save', err)
        console.log('Config files ready to : '.green,'db/GenIntfz.json'.blue)
    })
}

const loadingDB = () => {
    try {
        graphicElements = require('./db/GenIntfz.json');
    } catch (error) {
        graphicElements = [];
    }
}

module.exports = {
    readConfigFiles
}