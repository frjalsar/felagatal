const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

app.use(express.static('dist'))

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log('App listening on port ' + app.get('port')))
