// parses messages returned from server responses
// and put them in the msg object passed as parameter

// function doNothing(a) {
//   return a
// }



export function parseMsg(res, msg) {
  // console.log('parseMsg: ' + res, msg)

  // clears the messages
  Object.keys(msg).forEach(key => {
    msg[key] = ''
  })

  if (res.errors && Array.isArray(res.errors)) {
    res.errors.forEach(function(e) {
      if (e.hasOwnProperty('param')) {
        if (msg.hasOwnProperty(e.param)) {
          msg[e.param] = e.msg
        }
      }
    });
  }
}
