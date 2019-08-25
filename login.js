const agent = require('superagent')

function loginMiddleware () {
  return (req, res, next) => {
    const FRI_API_URL = process.env.FRI_API_URL
    agent
      .post(FRI_API_URL + '/login')
      .send({
        username: req.body.username,
        password: req.body.password
      })
      .withCredentials()
      .then(apiRes => {
        const oneWeekInMs = 100 * 60 * 60 * 24 * 7
        res.cookie('FRI_API_TOKEN', apiRes.body.token, {
          domain: 'fri.is',
          secure: process.env.NODE_Env === 'production',
          httpOnly: true,
          sameSite: true,
          maxAge: oneWeekInMs
        })

        apiRes.body.token = undefined
        const base64User = Buffer.from(JSON.stringify(apiRes.body)).toString('base64')

        res.cookie('FRI_FELAGATAL', base64User, {
          domain: 'fri.is',
          secure: process.env.NODE_Env === 'production',
          sameSite: true,
          maxAge: oneWeekInMs
        })

        res.send('OK')
      })
      .catch(err => {
        if (err.status === 401) {
          res.status(401).send(err.response.text)
        } else {
          next(err)
        }
      })
  }
}

module.exports = loginMiddleware
