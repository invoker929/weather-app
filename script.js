const cityinput = document.querySelector(".input-city");
const weatherData = document.querySelector(".weather-data");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const apiKey = 'bf5862da230557df8e82c56bf1aeccb5';
    const cityValue = cityinput.value;
    const url = getUrl(apiKey, cityValue);

    getWeatherData(url);
});

function getUrl(apiKey, cityValue) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
}

async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network isn't working!");
        }
        const data = await response.json();

        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const details = [
            `<span class="nowrap">Feels like</span>: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `<span class="nowrap">Wind speed</span>: ${data.wind.speed}m/s`
        ];

        insertWeatherData(false, icon, temperature, description, details);
    } catch (error) {
        console.log(error);
        insertWeatherData(true);
    }
}

function insertWeatherData(isError, ...[icon, temperature, description, details]) {
    const iconEl = weatherData.querySelector(".icon");
    const tempEl = weatherData.querySelector(".temperature");
    const descEl = weatherData.querySelector(".description");
    const detaEl = weatherData.querySelector(".details");
    if (isError) {
        iconEl.innerHTML = "";
        tempEl.textContent = "";
        descEl.textContent = 'An error happened, please try again later!';
        detaEl.innerHTML = "";
    } else {
        iconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"/>`;
        tempEl.textContent = `${temperature}°C`;
        descEl.textContent = description;
        detaEl.innerHTML = details.map(detail => `<div>${detail}</div>`).join('');
    }
}