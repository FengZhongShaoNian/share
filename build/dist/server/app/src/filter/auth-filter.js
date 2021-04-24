
const db = require('../util/datastore')
const { base64Encode } = require('../util/base64')

const filter = (req, res, next) => {
  let configPassword = db.read().get('config.password').value()
  if (configPassword !== '') {
    if (req.body === undefined) {
      res.sendStatus(403)
      return
    }
    const paramPassword = req.headers.token
    configPassword = base64Encode(configPassword).toLocaleLowerCase()
    if (!paramPassword || configPassword !== paramPassword.toLocaleLowerCase()) {
      res.sendStatus(403)
      return
    }
  }
  next()
}

module.exports = filter
