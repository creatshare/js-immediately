'use strict'

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../build')))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './dist/', 'index.html'))
})

app.listen(3000, function () {
    console.log('hello, eupt!')
})