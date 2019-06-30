const colors = require('colors');

let header = `
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">

    <title>GenWik</title>
  </head>
  <body>

`;

let footer = `
  <script src="assets/js/bootstrap.min.js"></script>
  </body>
</html>
`;

let end = `</div>`;


let gridInit = `
<div class="row container">
    <div class="col-md-12">
        <div class="row">

        <div class="col-md-6">
            <form action="/" method="POST">
                <div class="row">

`;

let confGridSmall = `
    <div class="col-md-4">
`;

let confGridLarge = `
    <div class="col-md-6">
`;

let gridEnd = `
                <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

        </div>
    </div>
</div>
`;



let configGrid = (elements) => {
  let fullBody = '';
  let content = '';

  fullBody = fullBody + header;
  fullBody = fullBody + gridInit;

  if (elements.length > 10) {
    console.log(`Loading small grid system whit ${elements.length} graphic elements`.green);
  } else {
    console.log(`Loading large grid system whit ${elements.length} graphic elements`.green);
  }

  elements.forEach(element => {
    
    if (elements.length > 10) {
      content =  content + confGridSmall + element + end;
    } else {
      content =  content + confGridLarge + element + end;
    }

  });

  fullBody = fullBody + content + gridEnd + footer;

  return fullBody;

}

module.exports = {
  configGrid
}