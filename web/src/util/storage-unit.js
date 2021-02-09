
import Decimal from 'decimal.js'

// 1KB 等于 1024 字节
const ONE_KB = new Decimal('1024')

// 1MB 等于 1048576字节
const ONE_MB = new Decimal('1048576')

// 1GB 等于 1073741824 字节
const ONE_GB = new Decimal('1073741824')

// 1TB
const ONE_TB = new Decimal('1099511627776')

// Byte 转 MB
function toKB (bytes) {
  return new Decimal(bytes).div(ONE_KB)
}

// Byte to MB
function toMB (bytes) {
  return new Decimal(bytes).div(ONE_MB)
}

// Byte to GB
function toGB (bytes) {
  return new Decimal(bytes).div(ONE_GB)
}

// Byte to TB
function toTB (bytes) {
  return new Decimal(bytes).div(ONE_TB)
}

// 选择最合适的单位
function chooseTheMostSuitableUnit (bytes) {
  bytes = new Decimal(bytes)
  if (bytes.lessThan(ONE_KB)) {
    return 'Byte'
  } else if (bytes.greaterThanOrEqualTo(ONE_KB) && bytes.lessThan(ONE_MB)) {
    return 'KB'
  } else if (bytes.greaterThanOrEqualTo(ONE_MB) && bytes.lessThan(ONE_GB)) {
    return 'MB'
  } else if (bytes.greaterThanOrEqualTo(ONE_GB)) {
    return 'GB'
  } else {
    return 'TB'
  }
}

function toHumanFriendlyFormat (bytes) {
  bytes = new Decimal(bytes)
  if (bytes.lessThan(ONE_KB)) {
    return `${bytes}Byte`
  } else if (bytes.greaterThanOrEqualTo(ONE_KB) && bytes.lessThan(ONE_MB)) {
    return `${toKB(bytes).toFixed(2)}KB`
  } else if (bytes.greaterThanOrEqualTo(ONE_MB) && bytes.lessThan(ONE_GB)) {
    return `${toMB(bytes).toFixed(2)}MB`
  } else if (bytes.greaterThanOrEqualTo(ONE_GB)) {
    return `${toGB(bytes).toFixed(2)}GB`
  } else {
    return `${toTB(bytes).toFixed(2)}TB`
  }
}

export default {
  chooseTheMostSuitableUnit,
  toHumanFriendlyFormat,
  toGB,
  toMB,
  toKB
}
