'use strict'

const express = require('express')
const parser = require('ua-parser-js')
const app = express()

app.set('port', process.env.PORT || 5000)

app.get('/', (req, res) => {
  const parsedUA = parser(req.headers['user-agent'])
  res.json({
    ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers['accept-language'].split(',')[0] || 'UNKNOWN',
    software: `${parsedUA.os.name} ${parsedUA.os.version}`
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`)
})
