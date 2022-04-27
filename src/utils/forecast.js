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
            callback(undefined, {
                weather_descriptions : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
               
            })
            //console.log(`${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} degree out . It feels like ${response.body.current.feelslike} `)
        }
     
    })
}



module.exports = forecast;