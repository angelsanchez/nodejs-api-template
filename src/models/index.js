var path = require('path'),
  fs = require('fs'),
  MODELS_FOLDER = './';

fs.readdirSync(path.join(__dirname, MODELS_FOLDER)).forEach(function loadModels(file) {
  if (~file.indexOf('.js')) {
    require(MODELS_FOLDER + file);
  }
});
