const authorEl = document.getElementById("author")
const cryptoEl = document.getElementById("crypto")
const cryptoTopEl = document.getElementById("crypto-top")
const timeEl = document.getElementById("time")
const weatherEl = document.getElementById("weather")

authorEl.textContent = "By: Dodi Achmad"
cryptoTopEl.textContent = "Loading Dogecoin..."
weatherEl.innerHTML = `
    <p class="weather-temp">--º</p>
    <p class="weather-city">Weather unavailable</p>
`

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        authorEl.textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        console.error("Could not load background image:", err)
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        cryptoTopEl.innerHTML = `
            <img src="${data.image.small}" alt="${data.name} logo" />
            <span>${data.name}</span>
        `
        cryptoEl.innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => {
        cryptoTopEl.textContent = "Crypto unavailable"
        console.error("Could not load crypto data:", err)
    })

function getCurrentTime() {
    const date = new Date()
    timeEl.textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

getCurrentTime()
setInterval(getCurrentTime, 1000)

function renderWeather(position) {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weatherEl.innerHTML = `
                <img src="${iconUrl}" alt="${data.weather[0].description}" />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => {
            console.error("Could not load weather data:", err)
        })
}

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(renderWeather, err => {
        console.error("Could not get location:", err)
    })
}
