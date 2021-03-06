var MongoClient = function(){
    this.initialize = function (config) {
        var mongoose = require('mongoose');
        var connection = mongoose.connection;
        var db = mongoose.connection;
        db.on('connecting', function() {
            console.log('connecting to MongoDB...');
        });
        db.on('error', function(error) {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
        });
        db.on('connected', function() {
            console.log('MongoDB connected!');
        });
        db.once('open', function() {
            console.log('MongoDB connection opened!');
        });
        db.on('reconnected', function () {
            console.log('MongoDB reconnected!');
        });
        db.on('disconnected', function() {
            console.log('MongoDB disconnected!');
            mongoose.connect(config, {server:{auto_reconnect:true}});
        });
        mongoose.connect(config, {server:{auto_reconnect:true}});
        this.mongoose = mongoose;
        this.connection = connection;
    }
}
module.exports = new MongoClient();