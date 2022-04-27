const request = require('postman-request')

    
const forecast = (latitude,longitude, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=cc37bab6979ac97474c3aa25b0b35b79&query=" + latitude + "," + longitude +"&units=m";

    request({ url: url , json:true}, (error, {body}) => {

        if(error) {
            callback("Unable to connect to weather service.",undefined);
        }
        else if(body.error) {
            callback("Unable to find location",undefined);
        }
        else{
            
                // weather_descriptions : body.current.weather_descriptions[0],
                // temperature : body.current.temperature,
                // feelslike : body.current.feelslike
                callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degree out.It feels like ' + body.current.feelslike);

            
        }
     
    })
}



module.exports = forecast;