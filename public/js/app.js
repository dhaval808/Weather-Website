console.log("client side javascript is loaded!");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');
const messagethree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageone.textContent = 'Loading...';
    messagetwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return  messageone.textContent = data.error;
            }
            else {
                messageone.textContent = data.location;
                messagetwo.textContent = data.forecast.weather_descriptions;
                messagethree.textContent = data.forecast.temperature;
            }
        })
    })
    
})
