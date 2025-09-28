// --- CONFIGURATION ---
// IMPORTANT: Replace "YOUR_API_KEY" with your actual OpenWeatherMap API key
const apiKey = "7798a2f835acf832580ebf0283326178";

// --- DOM ELEMENTS ---
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDisplay = document.getElementById('weatherDisplay');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessageP = document.getElementById('errorMessage');
const weatherDataDiv = document.getElementById('weatherData');

// --- UI UPDATE FUNCTIONS ---
const showLoading = () => {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherDataDiv.classList.add('hidden');
};

const showError = (message) => {
    errorMessageP.textContent = message;
    errorDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    weatherDataDiv.classList.add('hidden');
};

const showWeatherData = (data) => {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    
    weatherDataDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
};

// --- API CALL FUNCTION ---
const fetchWeather = async (city) => {
    if (apiKey === "YOUR_API_KEY") {
        showError("Please add your OpenWeatherMap API key to script.js.");
        return;
    }

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    showLoading();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        showWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError(`Could not fetch weather data. ${error.message}. Please try again.`);
    }
};

// --- GEOLOCATION FUNCTION ---
const fetchWeatherByCoords = async (lat, lon) => {
    if (apiKey === "YOUR_API_KEY") {
        showError("Please add your OpenWeatherMap API key to script.js.");
        return;
    }
    showLoading();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        showWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data by coords:", error);
        showError("Could not fetch weather for your location.");
    }
};

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                showError("Location access denied. Please enter a city manually.");
                // As a fallback, you could fetch a default city
                // fetchWeather("London");
            }
        );
    } else {
        showError("Geolocation is not supported by your browser.");
    }
};

// --- EVENT LISTENERS ---
searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value.trim());
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchWeather(cityInput.value.trim());
    }
});

// --- INITIALIZATION ---
window.addEventListener('load', () => {
     if (apiKey === "YOUR_API_KEY") {
        showError("Welcome! Please add your OpenWeatherMap API key to script.js to begin.");
     } else {
        getUserLocation();
     }
});
