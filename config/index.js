'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const bodyParser = require("body-parser");
const app = require('express')()
      app.use(bodyParser.urlencoded({ extended:true }));
      app.use(bodyParser.json());
const server = require('http').createServer(app)
      server.listen(8081);
// const io = require('socket.io')
// const ws = io.listen(server);
// const printer = require("printer"),
      // util = require('util');

app.post('/upload',function(req,res){
    console.log('upload');
});


// ws.on('connection', function(socket){
//   var socketId = socket.id;
//   var clientIp = socket.request.connection.remoteAddress;
//   console.log(clientIp);
//   socket.on('sendPrint', function(){
//     ws.emit('customEmitted');
//     socket.emit('customEmitted');
//     console.log('Send Print');
//     console.log('default printer name: ' + (printer.getDefaultPrinterName() || 'is not defined on your computer'));

//     var filename = __dirname + '/test.txt'

//     // printer.printFile({
//     //   filename:filename,
//     //   success:function(jobID){
//     //     console.log("sent to printer with ID: "+jobID);
//     //   },
//     //   error:function(err){
//     //     console.log("Top");
//     //   }
//     // });
    

//   });
// });


module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    https: true,
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
