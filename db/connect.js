const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    const err = new Error('MONGO_URI environment variable not set');
    console.error(err.message);
    return callback(err);
  }

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      _db = client.db('project1'); // explicitly specify your database name here
      console.log('Connected to MongoDB Database:', _db.databaseName);
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
