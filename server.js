const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const app = express()

app.use(compression())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.get('/test', (req, res) => {
  res.json({ test: true })
})

app.use(express.static('dist', {
  maxAge: '1y'
}))

app.get('/test', (req, res) => {
  res.json({ test: true })
})

app.set('port', process.env.PORT || 3010)
app.listen(app.get('port'), () => {
  console.log('App listening on port ' + app.get('port'))
})
