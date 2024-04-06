








const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
};

const getCurrentDateMonth = () => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = new Date();
    let date_month = document.getElementById('today_data');
    date_month.innerText = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
};
getCurrentDateMonth();

const getInfo = async (event) => {
    event.preventDefault();

    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = 'Please write the name before searching.';
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=c7036f4a442e7b0a6521cd640a03958a`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            city_name.innerText = `${data.name}, ${data.sys.country}`;
            
            // Convert temperature from Kelvin to Celsius
            const temperatureCelsius = kelvinToCelsius(data.main.temp);
            temp_real_val.innerText = temperatureCelsius.toFixed(2); // Display temperature with 2 decimal places

            const tempMood = data.weather[0].main;
            if (tempMood === "Clear") {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';
            } else if (tempMood === "Clouds") {
                temp_status.innerHTML = '<i class="fas fa-cloud" style="color: #f1f2f6;"></i>';
            } else if (tempMood === "Rain") {
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>';
            } else {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';
            }

            datahide.classList.remove('data_hide');

        } catch (error) {
            city_name.innerText = 'Please enter the city name properly.';
            datahide.classList.add('data_hide');
        }
    }
};

submitBtn.addEventListener('click', getInfo);
