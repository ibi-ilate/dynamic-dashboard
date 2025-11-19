# 🌤️ Dynamic Dashboard — Weather, Crypto & Background App

A minimalist **JavaScript dashboard** that displays the **current time**, **local weather**, and **live Dogecoin price**, along with a dynamically changing **nature-themed background** image from **Unsplash**.

---

## 🧠 Overview

This project integrates several APIs to build a real-time, visually engaging dashboard. It’s designed to demonstrate **asynchronous JavaScript**, **API fetching**, and **DOM manipulation** techniques.

---

## ⚙️ Features

✅ **Dynamic Backgrounds** — Fetches random nature-themed images from the [Unsplash API](https://unsplash.com/developers).
✅ **Live Cryptocurrency Prices** — Displays current, high, and low Dogecoin prices from the [CoinGecko API](https://www.coingecko.com/en/api).
✅ **Real-Time Clock** — Updates every second using `setInterval()`.
✅ **Local Weather Data** — Uses [OpenWeatherMap API](https://openweathermap.org/api) to show temperature, weather icon, and city based on your geolocation.
✅ **Fallback Handling** — Displays a default image and author if the Unsplash API fails.

---

## 🧩 How It Works

### **1. Unsplash API**

Fetches a random landscape photo with a **nature** query:

```javascript
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d)`;
        document.getElementById("author").textContent = `By: Dodi Achmad`;
    });
```

### **2. CoinGecko API**

Displays live Dogecoin data:

```javascript
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => res.json())
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    });
```

### **3. OpenWeatherMap API**

Fetches the user’s weather data using browser geolocation:

```javascript
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
        });
});
```

---

## 🛠️ Technologies Used

* **JavaScript (ES6+)**
* **HTML5 / CSS3**
* **Unsplash API**
* **CoinGecko API**
* **OpenWeatherMap API**

---

## 🚀 Getting Started

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/dynamic-dashboard.git
cd dynamic-dashboard
```

### **2. Open in Browser**

Simply open `index.html` in your web browser.
No build tools required — it runs entirely client-side.

### **3. (Optional) Use Your Own API Keys**

If you fork this project and want to use your own API keys, replace the existing URLs with your API credentials in `index.js`.

---

## 💡 Future Enhancements

* Add user-configurable **theme options** (light/dark).
* Include multiple **cryptocurrency selections**.
* Add **forecast support** for multi-day weather data.
* Save user preferences using **LocalStorage**.

---

## 🧑‍💻 Author

**Ibi-ilate Braide**
📧 ibi-ilatebraide@outlook.com
🌐 https://github.com/ibraide

---
