const express = require('express');
const colors = require('colors');
const fs = require('fs');
const shell = require("async-shelljs")

const app = express();
const open = require('open');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use( express.static( __dirname + '/public') );

app.post('/')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', urlencodedParser, function (req, res) {
    res.send('Data, ' + req.body.email)
    let data = req.body;

    let params = Object.keys(data).map(function(key) {
        return [String(key), data[key]];
    });
    
    genConfig(params);
    
})

const run = () => {
    console.log('Starting server'.green);
    app.listen(port, () => {
        console.log(`Listening to petitions at the port`.green,`${port}`.blue);
        console.log('URL: http://localhost:3000/'.yellow);
        console.log('Use'.green,'CTRL + C'.blue,'to close the server'.green);
        (async () => {
            console.log('Opening in the browser by default'.yellow);
            // Opens the URL in the default browser
            await open('http://localhost:3000/');
        })();
    })
}

const genConfig = (params) => {
    console.log('Config file save, running component...'.green);
    
    let configData = "-FWORK     @WORK_PATH@/Test_1/WORK \r\n";

    params.forEach( data => {
        console.log('data: ', data[0],':',data[1]);

        configData = configData + "-"+data[0] + '   ' + data[1]+'\r\n';
    })

    fs.writeFile('config.txt',configData, (err) => {
         if (err) throw new Error('Can not be saved'.red, err)
         console.log('File saved: '.green, 'config.txt'.yellow);
         exec();
    })

}

const exec = () => {
    
    shell.exec('java -jar ../target/1474__OpXPmx-1.0.jar -CONFIG configGen.txt', function(code, stdout, stderr) 
    {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        console.log("Process finished".yellow);
    });
}

module.exports = {
    run
}

