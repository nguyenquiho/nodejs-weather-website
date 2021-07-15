const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nguyen Qui Ho',
        age: 23
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address || req.query.address == '') {
        res.send({
            error: 'You must provide address!',
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: 'You must provide search item'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        error: 'Opps: Help article not found'
    })
})
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 404,
        error: 'Opps: About article not found'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        error: 'Opps: Page not found'
    })
})




// app.com
//app.com/help
//app.com/about


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})