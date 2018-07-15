
//-------------------------------- NOTES -------------------------------
//our db is called tvshow
//only 3 things is to require mongoose, create a schema and then export it.

//------------------------------- REQUIRE -------------------------------
const mongoose = require('mongoose');


//------------------------------- SCHEMA -------------------------------
//note the key here has to have the same name as the name attribute in your form. If they don't match up the schema will not be able to read it.
const tvshowSchema = new mongoose.Schema({
  name: {type: String, required: true},
  reason: String,
  netflixHulu: Boolean,
});


//------------------------------- EXPORT -------------------------------
//this model will be what allows us to talk to mongodb
//we're saying we want our documents in the database to look like the schema way.
// mongoose injects your model into mongodb


// first argument will be the name of your mongo collection
// second will be what those documents look like
//put your 1st argument singular b.c mongoose pluralizes it.

module.exports = mongoose.model('TvShow', tvshowSchema);
//his TvShow was Fruit

// module.exports = mongoose.model('Fruit', fruitSchema);
