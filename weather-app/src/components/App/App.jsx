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
  const [warning, setWarning] = React.useState(false)

  const getGeoFromInput = (inputValue) => {
    if (inputValue !== city.name) {
      console.log(config.key)
      const request = Axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=${config.key}`)
      request
        .then((res) => {
          setCity({
            name: res.data[0].name,
            lon: res.data[0].lon,
            lat: res.data[0].lat
          })
          console.log(res);
        })
        .catch((error) => setWarning(true))
    }
  }
  // React.useEffect(() => {
  //   if (city.name === '') {
  //     return
  //   } else {
  //     // const request = Axios.get(`http//:api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${config.KEY}`)
  //     // request.then((res) => console.log(res))
  //   }
  // }, [city])

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
          <WeatherDetails />

        </div>
        <div className="left">
          <img
            src={bg1}
            alt="background image"
            className="leftBg"
          />
          {appState === states[0] && <TodayWeather />}
          {appState === states[1] && <WeatherDays />}
        </div>
      </div>
    </div>
  );
}

export default App;
