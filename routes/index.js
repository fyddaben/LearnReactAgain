var changeFileName = function(name) {
  var fs = require('fs');
  var env = process.env.NODE_ENV;
  var isProduction = env === 'production';
  if (isProduction) {
    var assetsJson = require('../assets.json');

    var jsName = assetsJson[name].js;

    if (jsName.lastIndexOf('/') != -1) {
      jsName = jsName.substring(jsName.lastIndexOf('/') + 1);
    }

    var cssName = assetsJson[name].css;

    if (cssName.lastIndexOf('/') != -1) {
      cssName = cssName.substring(cssName.lastIndexOf('/') + 1);
    }

    return {
      "js": jsName,
      "css": cssName
    };

  } else {
    return {
      "js": name + ".js",
      "css": name + ".css"
    };
  }
}

exports.index = function(req, res) {
  var config = global.config;
  var fileJson = changeFileName('index');
  res.render('index', {
    title: 'hello index',
    static: config.relativePath,
    fileJson: fileJson
  });
}
exports.mobile = function(req, res) {
  var config = global.config;
  var fileJson = changeFileName('mobile');
  res.render('mobile', {
    title: 'hello mobile',
    static: config.relativePath,
    fileJson: fileJson
  });
}
