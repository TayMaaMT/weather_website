const request = require('request');

const gcoding = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidGF5bWFhIiwiYSI6ImNrMnhvdzljajBkc2czYnBtYnNoNWVmbHgifQ.HmG8I3Iwo7_ttdtpJWAYvA';

    request({ url, json: true }, function(err, { body }) {
        if (err) {
            callback('Unable to connect to Geocoding service', undefined);
        } else if (body.features.length == 0) {
            callback('This response and the information it contains may not be retained', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const place_name = body.features[0].place_name;


            callback(undefined, { latitude, longitude, place_name });
        }


    });


}

module.exports = gcoding;