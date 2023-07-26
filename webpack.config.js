const path = require('path');
module.exports = {
  entry: ['./src/index.js','./src/app.js','./src/login.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}