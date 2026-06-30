const searchbox = document.getElementById("searchbox");
const cityy = document.getElementById("city");
const searchbtn = document.querySelector("#search-group button");
const temp = document.getElementById("temp");
const image = document.querySelector(".weather-img img");
const speed = document.getElementById("speed");
const humidity = document.getElementById("hu");

async function getweather(city) {
    try {
        const weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=402a78c49ee3fac741f54230291e4030&units=metric`;

        const object = await fetch(weather);

        if (!object.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-img").style.display = "none";
            document.querySelector(".weather-text").style.display = "none";
            return;
        }

        const response = await object.json();

        temp.innerHTML = Math.round(response.main.temp) + "°C";
        humidity.innerHTML = response.main.humidity + "%";
        speed.innerHTML = response.wind.speed + " km/h";
        cityy.innerHTML = response.name;

        const condition = response.weather[0].main;

        if (condition === "Clouds") {
            image.src = "images/clouds.png";
        } else if (condition === "Clear") {
            image.src = "images/clear.png";
        } else if (condition === "Rain") {
            image.src = "images/rain.png";
        } else if (condition === "Drizzle") {
            image.src = "images/drizzle.png";
        } else if (condition === "Mist") {
            image.src = "images/mist.png";
        } else if (condition === "Haze") {
            image.src = "images/haze.png";
        }

        document.querySelector(".weather-img").style.display = "block";
        document.querySelector(".weather-text").style.display = "flex";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-img").style.display = "none";
        document.querySelector(".weather-text").style.display = "none";

        console.error("Weather API Error:", error);
    }
}

searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getweather(city);
});

searchbox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchbtn.click();
    }
});
