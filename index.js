const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://sumeet:sumeet@cluster0.ytzg1.mongodb.net/recipe-app?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(
      {
        title: "chicken",
        level: "Easy Peasy",
        ingredients: ["chicken", "salt"],
        cuisine: "American",
        dishType: "main_course",
        duration: 5,
        creator: "Sumeet"
      }
    )


  })

  .then(() => {
    return Recipe.insertMany(data).then(res => console.log(res))
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 })

  })
  .then(() => {
    return Recipe.deleteOne(
      { title: "Carrot Cake" }
    )
  })
  .then(() => {
    mongoose.connection.close()
  }
  )

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
