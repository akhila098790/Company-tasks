
    async function searchLocation() {
        const query = document.getElementById('cityInput').value;
        if (!query) return;

        const loader = document.getElementById('loader');
        const display = document.getElementById('weatherDisplay');
        
        loader.style.display = 'block';
        display.style.opacity = '0.3';

        try {
            
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`;
            const geoRes = await fetch(geoUrl);
            const geoData = await geoRes.json();

            if (!geoData.results) throw new Error("City not found in India");

            const city = geoData.results[0];
            
            
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&timezone=auto`;
            const weatherRes = await fetch(weatherUrl);
            const weatherData = await weatherRes.json();

            renderDashboard(city.name, city.admin1, weatherData.current_weather);

        } catch (err) {
            display.innerHTML = `<p style="color:#f87171; text-align:center;">${err.message}</p>`;
        } finally {
            loader.style.display = 'none';
            display.style.opacity = '1';
        }
    }
     
    function renderDashboard(name, state, weather) {
    document.getElementById('weatherDisplay').innerHTML = `
        <div class="main-info">
            <div class="city">${name}${state ? ', ' + state : ''}</div>
            <div class="temp">${Math.round(weather.temperature)}°C</div>
        </div>
    `;
}

    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchLocation();
    });
