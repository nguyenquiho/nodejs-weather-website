const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d2abe78d6d48e880ed29443ca9b0fdfb&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, 'It is ' + body.current.weather_descriptions + '. The current temperature is ' + body.current.temperature + ' degrees out')
        }
    })

}

module.exports = forecast