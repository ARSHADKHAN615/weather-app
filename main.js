const main = document.querySelector("main");
const Form = document.getElementById("my-form");
const Search = document.getElementById("search");
const Body = document.querySelector("body");
const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


async function get(city) {
    const res = await fetch(url(city));
    const getRespo = await res.json();
    console.log(getRespo);
    addWeathertoPage(getRespo);

}


function addWeathertoPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
                   <div><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></div>
                     <div>
                        <h1>${temp}°C</h1>
                        <p>${data.name}</p>
                     </div>
                         <h2 id="dec">${data.weather[0].main}</h2>
                        `


    if (data.message === "city not found") {
        weather.innerHTML = "<h1>city not found</h1>"
        console.log("yes");
    }

    main.appendChild(weather);


    // CHANGE A BACKGROUND AS weather 
    if (data.weather[0].main === "Rain") {
        Body.classList.remove("bg", "smoke", "cloud", "sun", "haze");
        Body.classList.add("bg", "rain");
    } else if (data.weather[0].main === "Smoke") {
        Body.classList.remove("bg", "rain", "cloud", "sun", "haze");
        Body.classList.add("bg", "smoke");
    } else if (data.weather[0].main === "Clouds") {
        Body.classList.remove("bg", "rain", "smoke", "sun", "haze");
        Body.classList.add("bg", "cloud");
    } else if (data.weather[0].main === "Clear") {
        Body.classList.remove("bg", "rain", "smoke", "cloud", "haze");
        Body.classList.add("bg", "sun");
    } else if (data.weather[0].main === "Haze") {
        Body.classList.remove("bg", "rain", "smoke", "cloud", "sun");
        Body.classList.add("bg", "haze");
    }
}

// kelvin to celsius 
function Ktoc(K) {
    return (K - 273.15).toFixed(2);
}


// SEARCH TRAM 
Form.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = Search.value.trim();
    get(location)
})