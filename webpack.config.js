var path = require('path');

module.exports = {
   // entry: '../script/index.js',
   output: {
      // path: __dirname,
      filename: '[name].js'
   },
   module: {
      loaders: [
         { 
            test: /\.css$/, 
            loader: 'style!css' 
        },
         {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue'
         }
      ]
   }
};