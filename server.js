
//GLOBAL VARIABLES
const express = require('express')
const app = express();
const port = 3000;


//REQUIREMENTS
require('./db/db'); //requires your database.
const Tv = require('./models/tvShows') //requiring the data from the model found in tvShows.js .
//imp: The . is b.c you're taking the collection(s) out of the models folder & putting it on the same level as package.json.
//imp2: Tv is now a variable you'll use in the edit page and others you can access the data through.


//----------------------  MIDDLEWARE  ------------------
//initialize & .use is an extra method for middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


//---------------------  ROUTES & PAGES  -----------------------

//--------------------- HOME PAGE ---------------------

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

        // we are asking mongoose to go to mongo and grab our database we named tvshows and send it to our controller who can then assign it to run to index.ejs

        //defines tvshows. THIS LINE IS IMPORTANT
        tvshows: databaseArray
      })
    }
  })
})



//--------------------  NEW PAGE ----------------------
//new page: get route b.c you're rendering a page.
//the form will be rendered to this page.
app.get('/new', (req, res) => {
  // res.send('this is for new'); for testing
  res.render('new.ejs')
})




//--------------------  CREATE ROUTE  ----------------------

// post will post the data up onto the page.
app.post('/home', (req, res) => {

  // grab the info from req.body and push it into the model. req.body is an object. the model is an array.
  // if (req.body.netflixHulu === 'on') {
  //   req.body.netflixHulu = true;
  // } else {
  //   req.body.netflixHulu = false;
  // }

  //adding the contents of the form to the model. the collection is in the database. This checks if we actually get a response.

  //Tv requires the model tvshows
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



//----------------------------  EDIT PAGE  -----------------------------


app.get('/home/:id/edit', (req, res) => {
  //^^^ when you want to grab this out, you use req.params

//Tv is the database you're looking through.
  Tv.findById(req.params.id, (err, databaseArray) => {
    // if (err) {
    //   console.log('error!');
    //   res.send(err);
    //  } else {
    //    console.log(databaseArray)
    // }
    res.render('edit.ejs', {
      tvshows: databaseArray //finds one tv show from our database tvshow in db/db.js
    });

  });
});


//--------------------  UPDATE ROUTE  ----------------------
app.put('/:id', (req, res) => {
  console.log('I am hitting the put route');
  console.log(req.body);
  Tv.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedShow) => {

      if(err){
        res.send(err);
      } else {
    //check to see if it is updating correctly.
    console.log(updatedShow, 'check our model');
    //check to see if it is updating correctly.
    res.redirect('/home');
}
  })
})





//---------------------------- SHOW ROUTE -----------------------------
//THIS PAGE IS localhost:3000/fruits/0 /1 or /2


// Show Route
app.get('/:id', (req, res) => {

  // Render is when you want to send
  // an ejs template to the client
  Tv.findById(req.params.id, (err, databaseArray) => {

    if(err){
      console.log(err, ' this is error in show');
      res.send(err);
    } else {
//check to see if it is updating correctly.
  // console.log(deletedFruit, ' this is the deletedFruit in the delete route');

      res.render('show.ejs', {

        //think this part may be wrong.
      tvshows: databaseArray// This creates a "tvshow" variable in the show page
    })
  }
  })
});






//--------------------------  DELETE ROUTE  ---------------------------


app.delete('/:id', (req, res) => {
  // console.log('req.body');

Tv.findByIdAndDelete(req.params.id, (err, deletedShow) => {
  if (err) {
    res.send('delete route has an error in it')
  } else {
  res.redirect('/home')
}
})
});



//Will use for your controller section here...



//Set up your port.
app.listen(port, () => {
  console.log('listening on port 3000');
})


// module.exports = router;  //later.
