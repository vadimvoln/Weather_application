import React from 'react'
import Axios from 'axios'

/*Components*/
import LocationForm from '../LocationForm/LocationForm'
import WeatherDetails from '../WeatherDetails/WeatherDetails'
import TodayWeather from '../TodayWeather/TodayWeather'
import WeatherDays from '../WeatherDays/WeatherDays'
/*+++++++++ */
import imgSelection from '../../logic/imgSelection'
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
  const [allWeather, setAllWeather] = React.useState([])
  const [curWeather, setCurWeather] = React.useState({})
  const [fourDaysWeather, setFourDaysWeather] = React.useState([])
  const [warning, setWarning] = React.useState(false)
  const [inputState, setInputState] = React.useState('')
  const [curImg, setCurImg] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  /*============================= */
  /* function to get city geolocation from input */
  const getGeoFromInput = (inputState) => {
    if (inputState !== city.name) {
      const request = Axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${inputState}&appid=${config.key}`)
      request
        .then((res) => {
          setCity({
            name: res.data[0].name,
            lon: res.data[0].lon,
            lat: res.data[0].lat
          })
          setWarning(false)
          setInputState('')
        })
        .catch((error) => setWarning(true))
    }
  }

  /* function to get current user's geolocation */
  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const request = Axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${config.key}`)
        request.then((res) => {
          setCity({
            name: res.data[0].name,
            lon: lon,
            lat: lat
          })
        })
      })
    }
    else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  /* function to get the weather for 5 days  */
  const getAllWeather = () => {
    const request = Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${config.key}`)
    request
      .then((res) => {
        setAllWeather(res.data.list)
      }).catch(error => alert(`Weather not found (${error})`))
  }

  /* function to get the weather for today  */
  const getCurrentWeather = () => {
    if (city.name !== '') {
      const curDate = Date.now()
      for (let i = 0; i < allWeather.length - 1; i++) {
        const weatherDt = Date.parse(allWeather[i].dt_txt)
        const weatherDtNext = Date.parse(allWeather[i + 1].dt_txt)
        if (curDate >= weatherDt && curDate < weatherDtNext) {
          setCurWeather(allWeather[i])
        }
      }
    }
  }

  const getFourDaysWeather = () => {
    const fourDaysArray = []
    if (city.name !== '') {
      for (let i = 8; i < allWeather.length - 1; i += 8) {
        fourDaysArray.push(allWeather[i])
        setFourDaysWeather(fourDaysArray)
      }
    }
  }

  /* All weather update after city update */
  React.useEffect(() => {
    if (city.name === '') {
      return
    } else {
      getAllWeather()
    }
  }, [city])

  /* current weather update after all weather update */
  React.useEffect(() => {
    getCurrentWeather()
    getFourDaysWeather()
  }, [allWeather])

  /* current img update after current weather update */
  React.useEffect(() => {
    setCurImg(imgSelection(curWeather))
  }, [curWeather])

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

          <LocationForm
            inputState={inputState}
            setInputState={setInputState}
            getGeoFromInput={getGeoFromInput}
            warning={warning}
            getCurrentPosition={getCurrentPosition} />
          <WeatherDetails currentWeather={curWeather} />

        </div>
        <div className="left">
          <img
            src={curImg}
            alt="background image"
            className="leftBg"
          />
          {appState === states[0] && <TodayWeather currentWeather={curWeather} city={city.name} />}
          {appState === states[1] && <WeatherDays currentWeather={curWeather} fourDaysWeather={fourDaysWeather} city={city.name} />}
        </div>
      </div>
    </div>
  );
}

export default App;
