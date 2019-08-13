const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const enforceHttps = require('express-sslify').HTTPS
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(enforceHttps())
  app.use(compression())
  app.use(helmet())
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(express.static('dist', {
  maxAge: '1y'
}))

app.set('port', process.env.PORT || 3010)
app.listen(app.get('port'), () => {
  console.log('App listening on port ' + app.get('port'))
})
