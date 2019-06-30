const fs = require('fs');
const colors = require('colors');
const { configGrid } = require('../config/graphicElements');
const { run } = require('../server');

let graphicElements = [];

const loadingDb = () => {
    try {
        console.log('Loading data ...'.green);
        graphicElements = require('../db/GenIntfz.json');
    } catch (error) {
        console.log(`This file doesn't exist`.green);
        graphicElements = [];
    }
}

const generatedInterface = () => {
    loadingDb();
    genIndex();
}

const genIndex = () => {
    let fullBody = configGrid(graphicElements);
    console.log('Generating interface ...'.green);
    fs.writeFile('./public/index.html', fullBody, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
        console.log('Generated interface ...'.green);
        run();
    })
}

module.exports = {
    generatedInterface
}