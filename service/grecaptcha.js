// "request" library has far friendlier API than Node's default 'http' library
const request = require('request');
const axios = require('axios');

// yes it's a weird func name, can you think of a better name?
exports.isHuman = async (secert) => {
  // Q is a nice little promise library I'm using in my project

  try {
    // const verify = await request.post('https://www.google.com/recaptcha/api/siteverify', {
    //   form: {
    //     secret: process.env.GOOGLE_RECAP_SECRET,
    //     response: recaptchaResponse,
    //     remoteip: req.connection.remoteAddress
    //   }
    // }, (err, httpResponse, body)=> {
    //   console.log('====================================');
    //   console.log('body' , body);
    //   console.log('====================================');
    //   return body;
    // });
    const verify = await axios({
          method: 'post',
          url: 'https://www.google.com/recaptcha/api/siteverify',
          params: {
              secret: process.env.GOOGLE_RECAP_SECRET,
              response: secert
          }
      });
      if (verify.data.success) {
          return true
      } else {
          return false
      }
  } catch (error) {
      return false
  }
}


