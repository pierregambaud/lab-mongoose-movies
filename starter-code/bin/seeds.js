const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");

const dbName = "lab-mongoose-movies";
mongoose.connect(`mongodb://localhost/${dbName}`).catch(err => next(err));

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "There's no impossible mission"
  },
  {
    name: "Beyonce",
    occupation: "Singer",
    catchPhrase: "I'm not a single lady"
  },
  {
    name: "Daffy Duck",
    occupation: "Comedian",
    catchPhrase: "Couak"
  }
];

Celebrity.create(celebrities, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${celebrities.length} celebrities`)
  mongoose.connection.close();
});