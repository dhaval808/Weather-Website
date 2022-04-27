const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = procss.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templetes/views');
const parialPaths = path.join(__dirname,'../templetes/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewspath);
hbs.registerPartials(parialPaths);

// Setup ststic directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title : 'weather app',
        name : 'Dhaval'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About me',
        name : 'Dhaval'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'How can I Help you?',
        name : 'Dhaval'
    });
})

app.get('/weather',(req,res) => {

    if (!req.query.address){
        return res.send({
            error : 'you must provide a address.'
        })
    }
         
    geocode(req.query.address, (error , {latitude , longitude , location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(latitude ,  longitude , (error , forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error : 'you must provide a search term.'
        })
    }

    console.log(req.query);
    res.send([{
        products : []
    }]);
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Dhaval',
        errorMessage : 'Help article not found.'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title : '404',
        name : 'Dhaval',
        errorMessage : 'Page not found.'
    })
})

app.listen(port, ()=>{
    console.log("server is up on port 3000." + port);
})