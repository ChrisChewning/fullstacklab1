
//GLOBAL VARIABLES
const express = require('express')
const app = express();
const port = 3000;


//REQUIREMENTS
require('./db/db'); //requires your database.
const Tv = require('../models/tvShows') //requiring the data from the models.
//NOTE: The .. is b.c you're taking the collection(s) out of the models folder & putting it on the same level as package.json


//----------------------  MIDDLEWARE  ------------------
//initialize & .use is an extra method for middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


//---------------------  ROUTES  -----------------------

//home page: get route b.c you're rendering a page.
app.get('/home', (req, res) => {
  // res.send('this is the home page'); for testing.
  res.render('index.ejs')
  //.find gives everything back. you'll have this {} always empty.
  //tvshows is a parameter we just created here to return the array you find.
  Tv.find({}, (err, databaseArray) => {
    if (err) {
      res.send(err);
    } else {
      res.render('index.ejs', {
        //tvshows is the whole database. when we do the .find we aren't passing in parameters b.c we our goal on the index page is to be able to grab the whole database. our mongoose is grabbing from mondo for us. index.ejs is where it passes through. 
        tvshows: databaseArray
      })
    }
  })
})

//new page: get route b.c you're rendering a page.
//the form will be rendered to this page.
app.get('/new', (req, res) => {
  // res.send('this is for new'); for testing
  res.render('new.ejs')
})

//post route b.c you're creating
app.post('/', (req, res) => {
  //no need to res.render here b.c you're not getting anything.
  res.redirect('/home')
})

//put route b.c you're editing
app.put('/', (req, res) => {
  //no need to res.render here b.c you're not getting anything.
  res.redirect('/home')
})



//Will use for your controller section here...




//Set up your port.
app.listen(port, () => {
  console.log('listening on port 3000');
})
