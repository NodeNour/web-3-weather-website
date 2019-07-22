const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/f4d2a1a95c8e8fd3064d15673e3899a6/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable', undefined)
        } else if (body.error) {
            callback('Another unable', undefined)
        } else {
            callback(undefined, {
                temperature: Math.round((body.currently.temperature - 32) *(5/9)),
                rainProb: body.currently.precipProbability*100,
                tempHigh: Math.round((body.daily.data[0].temperatureHigh - 32) *(5/9)),
                tempLow: Math.round((body.daily.data[0].temperatureLow - 32) *(5/9))
            })
        }
    })
}

module.exports = forecast