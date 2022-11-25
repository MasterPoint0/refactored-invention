const express = require('express');

const web = express();

web.all("/", function(req, res) {
  res.send('Bot Status: [OK]');
});

function keep_Alive() {
  web.listen(8000);
};

module.exports = keep_Alive;