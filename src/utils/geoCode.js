const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGlzaGFtY3NlIiwiYSI6ImNrb3l5c2gwbjBxOHoybnF3bXcwcGxlZmEifQ.4vEMrzNZ7GjGu0OM80PV1A&limit=1`;

    request({url, json: true}, (error, {body}, _) => {
        if (error) {                // no internet connection
            callback('Unable to connect to fetch geoLocation data');
            return;
        }

        if (body.message || body.features.length === 0) {         // invalid url data
            callback('Unable to find location');
            return;
        }

        const data = body.features[0];
        callback(undefined, {
            location: data.place_name,
            latitude: data.center[1],
            longitude: data.center[0]
        });
    });
};

module.exports = geoCode;