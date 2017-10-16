
//https://segmentfault.com/a/1190000005969643
const webpack = require('webpack');

var environment = process.env.NODE_ENV || "dev" // daily dev dist
var daily_environment = environment.indexOf("daily") != -1; // daily环境 webpack daily
var dist_environment = environment.indexOf("dist") != -1; // 生产环境 webpack dist


const vendors = [
  'react',
  'react-dom',
  'events',
  'url'
];

const buildPath = './build';
const srcPath = './src/';
const name = 'vendor';

module.exports = {
  buildPath:buildPath,
  srcPath:srcPath,
  name:name,
  output: {
    path: daily_environment ? srcPath : buildPath,
    filename: `${name}.js`,
    library: `${name}`,
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: `${name}`,
      context: __dirname,
    })
  ]
};

//线上打包压缩文件
if(dist_environment != -1){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}
