const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(publicDirectory))

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nour Fendri'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is the help page',
        title: 'Help',
        name: 'Nour Fendri'
    })
})

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Nour Fendri'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Error'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                errorMsg: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
        
            res.send({
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nour fendri',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Nour Fendri',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})