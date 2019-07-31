const express = require('express')
const compression = require('compression')
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')

const app = express()

app.use(compression())
app.use(history())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(express.static('dist'))

app.set('port', process.env.PORT || 3010)
app.listen(app.get('port'), () => {
  console.log('App listening on port ' + app.get('port'))
})
