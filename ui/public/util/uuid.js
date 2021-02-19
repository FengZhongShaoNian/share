
module.exports = {

  // 生成UUID
  uuid: function () {
    // uuid like: 998f8882-b4db-4a17-b443-78992d384835
    const numOne = Math.round(Math.random() * 10000000000 % parseInt('0xffffffff', 16)).toString(16)
    const numTwo = Math.round(Math.random() * 100000 % parseInt('0xffff', 16)).toString(16)
    const numThree = Math.round(Math.random() * 100000 % parseInt('0xffff', 16)).toString(16)
    const numFour = Math.round(Math.random() * 100000 % parseInt('0xffff', 16)).toString(16)
    const numFive = Math.round(Math.random() * 10000000000000 % parseInt('0xffffffffffff', 16)).toString(16)

    const partOne = numOne.padStart(8, '0')
    const partTwo = numTwo.padStart(4, '0')
    const partThree = numThree.padStart(4, '0')
    const partFour = numFour.padStart(4, '0')
    const partFive = numFive.padStart(12, '0')

    return `${partOne}-${partTwo}-${partThree}-${partFour}-${partFive}`
  }
}
