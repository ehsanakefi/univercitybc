const _ = require('lodash');

exports.phoneMobile = (number) => {
  number = _.parseInt(number)
  if ((_.startsWith(number, 989)) && (number.toString().length === 12)) {
    // console.log('_.startsWith(number, 989)) && (number.toString().length === 12', number)
    return number
  } else if ((_.startsWith(number, 9809)) && (number.toString().length === 13)) {
    let shbi098 = number.toString().slice(4)
    // console.log('shbi098 = number.toString().slice(4)', number)
    return number = _.parseInt('989' + shbi098)
  } else if ((_.startsWith(number, 9)) && (number.toString().length === 10)) {
    // console.log('_.startsWith(number, 9)) && (number.toString().length === 10', number)
    return number = _.parseInt('98' + number.toString())
  } else {
    // console.log('return number = number is not valid')
    return number = 'number is not valid'
  }
}

exports.phoneMobTell = (number, toleTell, codeShahr) => {
  number = _.parseInt(number)
  if ((_.startsWith(number, 98)) && (number.toString().length === 12) && (number.toString().charAt(2) !== '0')) {
    return number
  } else if ((number.toString().length === toleTell)) {
    return number = _.parseInt('98' + codeShahr.toString() + number.toString())
  } else if ((_.startsWith(number, 980)) && (number.toString().length === 13)) {
    let shbi980 = number.toString().slice(3)
    return number = _.parseInt('98' + shbi980)
  } else if (number.toString().length === 10) {
    return number = _.parseInt('98' + number.toString())
  } else {
    return number = 'number is not valid'
  }
}


// 9381028800
// 8132727453
// 1234567890
