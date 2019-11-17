const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/18f7272513c7c4aa6c8948c4ca50ef0a/' + latitude + ',' + longitude + '?lang=bg';

    request({ url, json: true }, function(err, { body }) { //json:true parser the response body as Json no need to parse it ...
        //const data = JSON.parse(res.body); becouse of json:true
        if (err) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Poorly formatted request', undefined);
        } else {
            callback(undefined, 'its ' + body.currently.icon + '. its currently ' + body.currently.temperature + ' degree out. ther is a ' + body.currently.precipProbability + '% vchance to rain');
        }

    });


}

module.exports = forecast;