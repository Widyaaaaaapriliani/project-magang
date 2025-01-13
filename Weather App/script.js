// script.js

const apiKey = '0c7b16d839e485fa0a70677cd55d769a'; // Ganti dengan API key dari OpenWeatherMap

async function getWeather() {
    const city = document.getElementById('city').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Menangani kesalahan jika kota tidak ditemukan
        if (data.cod === '404') {
            alert('City not found');
            clearWeatherInfo();
            return;
        }

        // Menampilkan data cuaca
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        alert('There was an error fetching the weather data. Please try again later.');
    }
}

function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('wether-info');

    // Mengambil icon cuaca dari API
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Memasukkan icon cuaca ke dalam img tag
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = 'block'; // Menampilkan icon cuaca

    // Menampilkan suhu
    tempDiv.innerHTML = `${data.main.temp}°C`;

    // Menampilkan informasi cuaca
    weatherInfo.innerHTML = `
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Fungsi untuk mengosongkan informasi cuaca jika tidak ditemukan
function clearWeatherInfo() {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('wether-info');

    weatherIcon.style.display = 'none'; // Menyembunyikan icon cuaca
    tempDiv.innerHTML = ''; // Mengosongkan suhu
    weatherInfo.innerHTML = ''; // Mengosongkan informasi cuaca
}

// Fungsi untuk membersihkan informasi cuaca
function clearWeather() {
    document.getElementById('city').value = ''; // Mengosongkan input kota
    clearWeatherInfo(); // Memanggil fungsi untuk mengosongkan informasi cuaca
}