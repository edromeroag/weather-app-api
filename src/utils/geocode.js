const request = require('request');

const geocoding = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + 
                '.json?access_token=pk.eyJ1IjoiZWRnYXJkb3IiLCJhIjoiY2sydW5peWpmMW84MTNkcWVoOG1kdXJkaCJ9.iWqHp7gjgl_1aNjiCrM20Q&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!')
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocoding;