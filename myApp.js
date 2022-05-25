require("dotenv").config();
const { save } = require("mongodb/lib/operations/collection_ops");
const mongoose = require("mongoose");
require("dotenv");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newDoc = new Person({
    name: "Bob",
    age: 50,
    favoriteFoods: ["Pasta", "Pizza", "Chips"],
  });

  newDoc.save(function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Dave", age: 40, favoriteFoods: ["Sausages", "Bacon"] },
  { name: "Sian", age: 41, favoriteFoods: ["Chicken", "Spinach"] },
  { name: "Ruth", age: 39, favoriteFoods: ["Paella", "Potatoes"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const personName = "Sian";

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save(function (err, updatedPerson) {
      err ? console.log(err) : done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      err ? console.log(err) : done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
