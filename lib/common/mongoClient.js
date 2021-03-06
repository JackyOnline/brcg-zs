// Generated by CoffeeScript 1.9.3
(function() {
  var MongoClient;

  MongoClient = (function() {
    function MongoClient() {}

    MongoClient.prototype.initialize = function(config) {
      var connection, db, mongoose;
      mongoose = require('mongoose');
      connection = mongoose.connection;
      db = mongoose.connection;
      db.on('connecting', function() {
        return console.log('connecting to MongoDB...');
      });
      db.on('error', function(error) {
        console.error('Error in MongoDb connection: ' + error);
        return mongoose.disconnect();
      });
      db.on('connected', function() {
        return console.log('MongoDB connected!');
      });
      db.once('open', function() {
        return console.log('MongoDB connection opened!');
      });
      db.on('reconnected', function() {
        return console.log('MongoDB reconnected!');
      });
      db.on('disconnected', function() {
        console.log('MongoDB disconnected!');
        return mongoose.connect(config, {
          server: {
            auto_reconnect: true
          }
        });
      });
      mongoose.connect(config, {
        server: {
          auto_reconnect: true
        }
      });
      this.mongoose = mongoose;
      return this.connection = connection;
    };

    return MongoClient;

  })();

  module.exports = new MongoClient();

}).call(this);
