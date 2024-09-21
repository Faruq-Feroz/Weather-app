const weather = document.querySelector('.weather');
const searchBtn = document.querySelector('button[role="search"]');
const cityField = document.querySelector('input[type="search"]');
const forecastRow = document.querySelector('.forecast > .row');
const dateElement = document.querySelector('.header__date');
const geolocateIcons = document.querySelectorAll('.header__geolocate');

const icons = {
  '01d': 'wi-day-sunny', '02d': 'wi-day-cloudy', '03d': 'wi-cloud',
  '04d': 'wi-cloudy', '09d': 'wi-showers', '10d': 'wi-rain',
  '11d': 'wi-thunderstorm', '13d': 'wi-snow', '50d': 'wi-fog',
  '01n': 'wi-night-clear', '02n': 'wi-night-alt-cloudy', '03n': 'wi-cloud',
  '04n': 'wi-night-cloudy', '09n': 'wi-night-showers', '10n': 'wi-night-rain',
  '11n': 'wi-night-thunderstorm', '13n': 'wi-night-alt-snow', '50n': 'wi-night-fog'
};

const removeChildren = parent => {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
};

const renderForecast = forecast => {
  removeChildren(forecastRow);
  forecast.forEach(weatherData => {
    const markup = `<div class="forecast__day">
      <h3 class="forecast__date">${getWeekDay(new Date(weatherData.dt * 1000))}</h3>
      <i class='wi ${icons[weatherData.weather[0].icon]} forecast__icon'></i>
      <p class="forecast__temp">${Math.floor(weatherData.main.temp)}°C</p>
      <p class="forecast__desc">${weatherData.weather[0].main}</p>
    </div>`;
    forecastRow.insertAdjacentHTML('beforeend', markup);
  });
};

const getCityWeather = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const markup = `<h1 class="location">${data.name}, ${data.sys.country}</h1>
        <div class="weather__summary">
          <p><i class="wi ${icons[data.weather[0].icon]} weather-icon"></i> <span class="weather__celsius-value">${Math.floor(data.main.temp)}°C</span></p>
          <p>${data.weather[0].main}</p>
          <ul class="weather__miscellaneous">
            <li><i class="wi wi-humidity"></i> Humidity <span>${data.main.humidity}%</span></li>
            <li><i class="wi wi-small-craft-advisory"></i> Wind Speed <span>${data.wind.speed} m/s</span></li>
          </ul>
        </div>`;
      removeChildren(weather);
      weather.insertAdjacentHTML('beforeend', markup);
    })
    .catch(console.error);
};

const getForecast = url => {
  fetch(url)
    .then(response => response.json())
    .then(data => renderForecast(data.list.filter(obj => obj.dt_txt.endsWith('06:00:00'))));
};

const getWeatherByCity = city => {
  const apiKey = '35b1f1d45a7b4378cf2430ae601816be';
  getCityWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`);
  getForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`);
};

const geosuccess = position => {
  const { latitude, longitude } = position.coords;
  getWeatherByCity(`lat=${latitude}&lon=${longitude}`);
};

const printDateAndTime = () => {
  const now = new Date();
  

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = now.toLocaleString('en-US', dateOptions);

 
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const timeString = now.toLocaleString('en-US', timeOptions);

 
  dateElement.textContent = `${dateString} | ${timeString}`;
};


printDateAndTime(); 
setInterval(printDateAndTime, 1000); 




searchBtn.addEventListener('click', e => {
  e.preventDefault();
  getWeatherByCity(cityField.value);
});

geolocateIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(geosuccess);
    else alert('Your browser does not support geolocation');
  });
});

printTodayDate();


const textbox = document.getElementById("textbox")
const fahrenheit = document.getElementById("fahrenheit")
const tocelcius = document.getElementById("tocelcius")
const result = document.getElementById("result")
let temp;
function convert(){
    
if(fahrenheit.checked){
    temp = Number(textbox.value);
    temp= temp * 9/5 + 32;
    result.textContent = temp.toFixed(1)+ ` C`
}
else if(tocelcius.checked){
    temp = Number(textbox.value);
    temp = (temp-32) * (5/9)
    result.textContent = temp.toFixed(1)+ ` C`
}
else{
    result.textContent = "Please select a unit"
    result.style.color = 'red'
}
}