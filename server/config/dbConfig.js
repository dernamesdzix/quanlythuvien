const mongoose = require(`mongoose`);
// moongoose.set(`strictQuery`, false);

mongoose.connect(process.env.mongo_URL);

const connection = mongoose.connection;

connection.on(`connected`, () => {
  console.log("Connected to MongoDB Sucessfully");
});
connection.on(`error`, () => {
  console.log("Connected to MongoDB Failed");
});

module.exports = connection;
