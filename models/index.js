const mongoose = require('mongoose');

// const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/airfec-photos';
const dbURI = `mongodb://${process.env.MONGODB_URI ||
  'localhost'}:27017/airfec-photos`;

console.log(dbURI);

mongoose.connect(
  dbURI,
  { family: 4, useNewUrlParser: true }
);

mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

module.exports = {
  Photo: require('./Photo')
};
