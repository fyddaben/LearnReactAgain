'use strict';
var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react/lib/ReactDom.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var srcDir = path.resolve(__dirname, 'src');
var AssetsPlugin = require('assets-webpack-plugin');

var glob = require('glob');
var env = process.env.NODE_ENV;
var config = require('./config')[env];
var isProduction = env === 'production';

var entries = function() {
    var  jsDir = path.resolve(srcDir, 'js')
    var  entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var  map = {}

    entryFiles.forEach(function(filePath) {
      var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
      var fileArray = [];
      fileArray.push(filePath);
      if (!isProduction) {
        fileArray.push("webpack-dev-server/client?" + config.static_path + ':' + config.static_port);
        fileArray.push("webpack/hot/only-dev-server");
      }
      map[filename] = fileArray;
    });

    return map;
};
var entriPath = entries();
var jsLoaderStr = 'react-hot!babel-loader?presets[]=react,presets[]=es2015';
var scssLoaderStr = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
var pluginList = [
  new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js')
];
var jsOutputName = '';
if (isProduction) {
  jsLoaderStr = 'babel-loader?presets[]=react,presets[]=es2015';
  scssLoaderStr = ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!sass-loader');
  pluginList.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
  pluginList.push(
    new AssetsPlugin({
      filename: 'assets.json',
      prettyPrint: true,
      fullPath: false
    })
  );
  pluginList.push(
    new ExtractTextPlugin("css/[name]_[chunkhash:8].css")
  );
  jsOutputName = 'js/[name]_[chunkhash:8].js';
} else {
  pluginList.push(
    new webpack.HotModuleReplacementPlugin()
  );
  pluginList.push(
    new ExtractTextPlugin("css/[name].css")
  );
  jsOutputName = 'js/[name].js';
}
var publicPath = '';
if (config.static_port) {
  publicPath = config.static_path + ':' + config.static_port + config.relativePath;
} else {
  publicPath = config.static_path  + config.relativePath;
}
module.exports = {
  entry: Object.assign(entriPath, {
    'vendors': ['react']
  }),
  output: {
    path: path.resolve(__dirname, 'public'),
    // 主要用于code spling
    publicPath: config.static_path + ':' + config.static_port + config.relativePath,
    filename: jsOutputName,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: jsLoaderStr,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loader: scssLoaderStr
      }
    ]
  },
  plugins: pluginList
};

