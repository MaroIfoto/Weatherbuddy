//  event listener to get location inout 
document.getElementById("location-input").addEventListener('change', async () => {
    // get user entered location
    const location = document.getElementById("location-input").value;
    
    // fetch weather data
    const weatherData = await getWeatherData(location);

    // Display weather data
    displayWeatherData(weatherData);

});

const getWeatherData = async (location) => {
    if(!location) {
        return{};
    }

    const apiKey = 'abf4448665aaa1437d1b5501ed04ab19'
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=abf4448665aaa1437d1b5501ed04ab19`);
    const data = await response.json();

    return data;
}

function getBackgroundColor(temperature) {
    if(temperature < 0) {
        return 'lightblue';
    }else if(temperature < 10) {
        return 'lightgreen';
    }else if(temperature < 20) {
        return 'lightyellow';
    }else if(temperature < 30) {
        return 'lightsalmon';
    }else {
        return 'lightcoral'
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length === 0) {
        weatherDataElement.innerHTML= "Please enter a loction to see the weather"
    }else {
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.13));
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.13)}°C</p>
            <p>Humidity: ${Math.floor(data.main.humidity)}%</p>
            <p>Speed: ${data.wind.speed}m/s</p>
        `;
    }
}

window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}