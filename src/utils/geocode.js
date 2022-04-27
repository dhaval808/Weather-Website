const request = require('postman-request');

const url = "http://api.weatherstack.com/current?access_key=cc37bab6979ac97474c3aa25b0b35b79&query=22.303894,70.802162&units=m";
const geocode = (address,callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiZGhhdmFsODA4IiwiYSI6ImNsMjhvZW4wMjBiN3AzcW1kYjhkNm5iYmoifQ.CGoN5_Su_oVACBo7O8bsNg&limit=1";

    request({ url : url, json : true}, (error,{ body }) => {
        if(error){
            callback("Unable to connect to location service.",undefined);
        }
        else if(body.features.length === 0){
            callback("Unable to find location , try another search.",undefined);
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
            
        }
    })
}
module.exports = geocode;