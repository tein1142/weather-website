const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherAPI = `http://api.weatherstack.com/current?access_key=97d8e8759f7adc753c01e763dffb3afd&query=${latitude},${longitude}`
    request({
        url: weatherAPI,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body)
            callback(undefined, [`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feel like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`, body.current.weather_icons])
        }
    })
}

module.exports = forecast