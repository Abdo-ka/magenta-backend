const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const envPath = path.resolve(__dirname, `./.env/${env}_env.env`);

dotenv.config({ path: envPath });
const DB = process.env.DataBase.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {})
  .then(con => {
    console.log('DB connect succeffuly!');
  })
  .catch(err => {
    console.log(`Error Has Happened ${err}`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
