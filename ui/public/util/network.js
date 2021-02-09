
const os = require('os')

const getAllNetCards = function () {
  const networkInterfaces = os.networkInterfaces()
  const netCards = []
  for (const netCard in networkInterfaces) {
    netCards.push(netCard)
  }
  return netCards
}

const getIpv4AddressByNetCard = function (netCard) {
  const networkInterfaces = os.networkInterfaces()
  const networkInterface = networkInterfaces[netCard]
  if (!networkInterface) {
    return undefined
  }
  for (const network of networkInterface) {
    if (!network.internal && network.family === 'IPv4' && network.address !== '127.0.0.1') {
      return network.address
    }
  }
}

module.exports = {
  getAllNetCards,
  getIpv4AddressByNetCard
}
