const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const app = express()
const port = process.env.PORT || 3000
    //define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
    // Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pantavit Hangnalen'

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pantavit Hangnalen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This page can help your problem',
        title: 'Help',
        name: 'Pantavit hangnalen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address!'
        })
    } else
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            console.log(req.query.address)
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                // console.log(location)
                // console.log(forecastData)
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// error pages 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pantavit Heangnalen',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pantavit Heangnalen',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
});