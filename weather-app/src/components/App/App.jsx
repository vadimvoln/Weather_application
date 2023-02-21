import React from 'react';
import Axios from 'axios'

/*Components*/
import LocationForm from '../LocationForm/LocationForm';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import TodayWeather from '../TodayWeather/TodayWeather'
import WeatherDays from '../WeatherDays/WeatherDays'
import Capitals from '../Capitals/Capitals';
/*+++++++++ */
import bg1 from '../../assets/img/stormAlb/storm_3.png'
import config from '../../config'

function App() {
  const states = ['Today', '5days']

  /* Determining the state of a App*/
  const [appState, setAppState] = React.useState(states[0])
  const [city, setCity] = React.useState({
    name: '',
    lon: 0,
    lat: 0
  })
  const [weather, setWeather] = React.useState([])
  const [warning, setWarning] = React.useState(false)

  const getGeoFromInput = (inputValue) => {
    if (inputValue !== city.name) {
      const request = Axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=${config.key}`)
      request
        .then((res) => {
          setCity({
            name: res.data[0].name,
            lon: res.data[0].lon,
            lat: res.data[0].lat
          })
        })
        .catch((error) => setWarning(true))
    }
  }

  React.useEffect(() => {
    if (city.name === '') {
      return
    } else {
      const request = Axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${config.key}`)
      request
        .then((res) => {
          setWeather(res.data.list)
          console.log(res.data.list)
        })
    }
  }, [city])

  const getCurrentWeather = () => {
    if (city.name !== '') {
      const curDate = Date.now()
      for (let i = 0; i < weather.length - 1; i++) {
        const weatherDt = Date.parse(weather[i].dt_txt)
        const weatherDtNext = Date.parse(weather[i + 1].dt_txt)
        if (curDate >= weatherDt && curDate < weatherDtNext) {
          return weather[i]
        }
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="right">

          <div className="btns">
            {states.map((state, index) => {
              return <button key={index} onClick={() => setAppState(state)}
                className={appState === state ? 'active' : ''}>{state}</button>
            })}
          </div>

          <LocationForm getGeoFromInput={getGeoFromInput} warning={warning} />
          <Capitals />
          <WeatherDetails currentWeather={getCurrentWeather} />

        </div>
        <div className="left">
          <img
            src={bg1}
            alt="background image"
            className="leftBg"
          />
          {appState === states[0] && <TodayWeather
            currentWeather={getCurrentWeather}
            city={city.name} />}
          {appState === states[1] && <WeatherDays />}
        </div>
      </div>
    </div>
  );
}

export default App;
