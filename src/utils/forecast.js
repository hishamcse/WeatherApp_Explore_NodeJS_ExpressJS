const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=165d61f274ee67a8d7f63a1403134eb9&query=${latitude},${longitude}&units=m`;

    request({url, json: true}, (error, {body}, _) => {
        if (error) {                // no internet connection
            callback('Unable to connect to fetch geoLocation data');
            return;
        }

        if (body.error) {         // invalid url data
            callback('Unable to find location');
            return;
        }

        callback(undefined, body.current);
    });
};

module.exports = forecast;