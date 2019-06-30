const express = require('express');
const colors = require('colors')
const app = express();
const open = require('open');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use( express.static( __dirname + '/public') );

app.post('/')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', urlencodedParser, function (req, res) {
    res.send('Data, ' + req.body.email)
    console.log(req.body);

    let data = req.body;
    let result = Object.keys(data).map(function(key) {
        return [String(key), data[key]];
      });
      
      console.log(result);

      result.forEach( data => {
          console.log('data: ', data[0]);
          
      })
    
    
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

// console.log('Starting server'.green);
// app.listen(port, () => {
//     console.log(`Listening to petitions at the port`.green,`${port}`.blue);
//     console.log('URL: http://localhost:3000/'.yellow);
//     console.log('Use'.green,'CTRL + C'.blue,'to close the server'.green);
//     (async () => {
//         console.log('Opening in the browser by default'.yellow);
//         // Opens the URL in the default browser
//         await open('http://localhost:3000/');
//     })();
// })

module.exports = {
    run
}

