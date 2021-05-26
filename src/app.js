const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');        // if we rename the templates folder as templates. we have to specify path if we don't use default configuration
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);            // if we don't use default file naming or default path, we have to specify this
hbs.registerPartials(partialsPath);

// setup static directory
app.use(express.static(publicDirPath));           // for static contents

app.get('', (req, res) => {
    res.render('index', {                           // for dynamic contents
        title: 'Weather',
        name: 'Syed Jarullah Hisham'
    });
});

app.get('/about', (req, res) => {         // for dynamic contents
    res.render('about', {
        title: 'Weather About',
        name: 'Syed Jarullah Hisham'
    });
});

app.get('/help', (req, res) => {         // for dynamic contents
    res.render('help', {
        title: 'Weather Help',
        name: 'Syed Jarullah Hisham',
        alternate: 'hisham',
        message: 'This is our help page'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to specify an address to get the weather details'
        })
    }

    geoCode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, {
            weather_descriptions: weatherState,
            temperature,
            precip,
            weather_icons
        } = {}) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                address: req.query.address,
                location,
                forecast: `${weatherState}. Today temperature is: ${temperature}℃. There is ${precip}% chance of rain`,
                weather_icons
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You have to enter a search term'
        });
    }

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather Error',
        name: 'Syed Jarullah Hisham',
        message: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather Error',
        name: 'Syed Jarullah Hisham',
        message: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('server starts listening');
});