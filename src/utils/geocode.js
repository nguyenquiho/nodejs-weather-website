const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicXV5aG9uZ3V5ZW4iLCJhIjoiY2txaXppbjliMDQzczJub2J4NzYzdDVreCJ9.I31vGmnDyLNoWKvWJIRT9g&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0 || (!body.features.length)) {
            callback('Unable to find location. Try another search!', undefined)
        } else if (body === undefined) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode