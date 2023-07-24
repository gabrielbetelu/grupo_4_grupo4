const { log } = require('console');
const fs = require('fs');

const logs = (req, res, next) => {
    fs.appendFileSync('logs.txt', 'Ingresó en la página ' + req.url +'\n', 'utf-8')
    next();
}

module.exports = logs;