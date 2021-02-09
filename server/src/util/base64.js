function base64Encode (string) {
  return Buffer.from(string).toString('base64')
}

// eslint-disable-next-line no-unused-vars
function base64Decode (base64str, file) {
  return Buffer.from(base64str, 'base64')
}

module.exports = {
  base64Encode,
  base64Decode
}
