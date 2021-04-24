
const fs = require('fs')
const path = require('path')

function getStats (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err)
        return
      }
      resolve(stats)
    })
  })
}

// 判断path是否是一个目录
// 如果path所指定的路径不存在，
// 抛出异常
async function isDirectory (path) {
  const stats = await getStats(path)
  if (stats.isDirectory()) {
    return true
  }
  return false
}

// 判断目录是否存在
async function isDirectoryExist (path) {
  try {
    const stats = await getStats(path)
    if (stats.isDirectory()) {
      return true
    }
    return false
  } catch (e) {
    if (e.code === 'ENOENT') {
      // 路径不存在
      return false
    }
    return Promise.reject(e)
  }
}

// 递归创建目录
function mkdirRecursively (path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve('目录创建成功')
    })
  })
}

function nextName (name) {
  const reg = /\(([1-9]+)\)+$/
  if (reg.test(name)) {
    const num = parseInt(reg.exec(name)[1])
    const nextNum = num + 1
    const newName = name.replace(/\(([0-9]+)\)+$/, '(' + nextNum + ')')
    return newName
  }
  return name + '(1)'
}

// 获取一个在directory中不存在的文件名
// 例如，假设directory为：/home/abc，originalFileName为hello.txt
// 若是directory中不存在hello.txt这个文件，则返回hello.txt
// 否则则看一下hello(1).txt是否存在，如果不存在，则返回hello(1).txt
// 若是hello(1).txt也存在，就看一下hello(2).txt是否存在，依次类推
async function requireAnUnusedName (directory, originalFileName) {
  const filePath = path.join(directory, originalFileName)
  try {
    await getStats(filePath)
    // 文件已存在
    const extensionName = path.extname(originalFileName)
    const basename = path.basename(originalFileName, extensionName)
    const newBaseName = nextName(basename)
    const result = await requireAnUnusedName(directory, newBaseName + extensionName)
    return result
  } catch (e) {
    if (e.code === 'ENOENT') {
      // 文件不存在
      return originalFileName
    }
    return Promise.reject(e)
  }
}

module.exports = {
  getStats,
  isDirectory,
  mkdirRecursively,
  isDirectoryExist,
  requireAnUnusedName
}
