
//GLOBAL VARIABLES
const express = require('express')
const app = express();
const port = 3000;


//REQUIREMENTS
require('./db/db'); //requires your database.
const Tv = require('./models/tvShows') //requiring the data from the models.
//imp: The . is b.c you're taking the collection(s) out of the models folder & putting it on the same level as package.json


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
  // res.render('index.ejs') this is moved down.
  //.find gives everything back. you'll have this {} always empty.
  //tvshows is a parameter we just created here to return the array you find.
  Tv.find({}, (err, databaseArray) => {
    if (err) {
      res.send(err);
    } else {
      res.render('index.ejs', {
        //tvshows is the whole database. when we do the .find we aren't passing in parameters b.c we our goal on the index page is to be able to grab the whole database. our mongoose is grabbing from mondo for us. index.ejs is where it passes through.

        // were asking mongoose to go to mongo and grab our database we named tvshows and send it to our controller who can then assign it to run to index.ejs
        tvshows: databaseArray
      })
    }
  })
})

//new page: get route b.c you're rendering a page.
//the form will be rendered to this page.
app.get('/home/new', (req, res) => {
  // res.send('this is for new'); for testing
  res.render('new.ejs')
})

//--------------------  CREATE ROUTE  ----------------------

// router.post will post the data up onto the page.
app.post('/new', (req, res) => {

  // grab the info from req.body and push it into the model. req.body is an object. the model is an array.
  if (req.body.netflixHulu === 'on') {
    req.body.netflixHulu = true;
  } else {
    req.body.netflixHulu = false;
  }

  //adding the contents of the form to the model. the collection is in the database. This checks if we actually get a response.
  Tv.create(req.body, (err, createdShow) => {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      console.log(createdShow)
      //we want to respond to the client after we get the response from the database.
      res.redirect('/home'); //res.redirect redirects the user back to whatever you write in the ('/...').
    }
  });
});





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
