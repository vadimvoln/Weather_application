import LocationForm from './LocationForm/LocationForm';
import WeatherDetails from './WeatherDetails/WeatherDetails';
import TodayWeather from './TodayWeather/TodayWeather';
import WeatherDays from './WeatherDays/WeatherDays';
import Capitals from './Capitals/Capitals';
import bg1 from '../assets/img/stormAlb/storm_3.png'

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="right">
          <div className="btns">
            <button className="active">Today</button>
            <button>5 days</button>
          </div>

          <LocationForm />
          <Capitals />
          <WeatherDetails />

        </div>
        <div className="left">
          <img
            src={bg1}
            alt="background image"
            className="leftBg"
          />
          {/* <TodayWeather /> */}
          <WeatherDays />
        </div>
      </div>
    </div>
  );
}

export default App;
