const { promisify } = require('util')
const sleep = promisify(setTimeout)

exports.sleep = sleep;