const path = require('path');
module.exports = {
  entry: {
    todo : ['./src/index.js','./src/app.js'],
    login : './src/login.js'
  },
  output: {
    filename: '[name].main.js',
    path: path.resolve(__dirname, 'dist'),
  }
}