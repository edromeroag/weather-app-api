const request = require('request');

const forecast = (latitude, longitude, units, callback) => {
    const url = 'https://api.darksky.net/forecast/df56530aaf5488875ff38a1b62089fa2/' + encodeURIComponent(latitude) + ',' +
                encodeURIComponent(longitude) + '?units=' + encodeURIComponent(units);

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                forecast: body.currently
            })
        }
    })
}

module.exports = forecast;