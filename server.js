const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const geocode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');
const transform = require('unix-timestamp-transform');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    geocode(req.body.location, (error, {latitude, longitude, location}) => {
        if(error) {
            res.send(error)
        } else {
            forecast(latitude, longitude, req.body.units, (error, forecastData) => {
                if(error) {
                    return res.send(error)
                }
                
                const time = transform.transformUnixTime(forecastData.forecast.time).toDateString()
                res.json({
                    location: location,
                    forecast: forecastData.forecast,
                    time: time
                })
            })
        }
    }) 
})

app.get('/', (req, res) => {
    res.send({
        message: 'It is working'})
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`server is up on port ${process.env.PORT}`);
})