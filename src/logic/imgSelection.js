import cloudy_1 from '../assets/img/cloudyAlb/cloudy_1.jpg'
import cloudy_2 from '../assets/img/cloudyAlb/cloudy_2.jpg'
import cloudy_3 from '../assets/img/cloudyAlb/cloudy_3.jpg'
import cloudy_4 from '../assets/img/cloudyAlb/cloudy_4.jpg'
import cloudy_5 from '../assets/img/cloudyAlb/cloudy_5.jpg'

import fog_1 from '../assets/img/fogAlb/fog_1.jpg'
import fog_2 from '../assets/img/fogAlb/fog_2.jpg'
import fog_3 from '../assets/img/fogAlb/fog_3.jpg'
import fog_4 from '../assets/img/fogAlb/fog_4.jpg'
import fog_5 from '../assets/img/fogAlb/fog_5.jpg'

import rain_1 from '../assets/img/rainAlb/rain_1.jpg'
import rain_2 from '../assets/img/rainAlb/rain_2.jpg'
import rain_3 from '../assets/img/rainAlb/rain_3.jpg'
import rain_4 from '../assets/img/rainAlb/rain_4.jpg'
import rain_5 from '../assets/img/rainAlb/rain_5.jpg'

import snow_1 from '../assets/img/snowAlb/snow_1.jpg'
import snow_2 from '../assets/img/snowAlb/snow_2.jpg'
import snow_3 from '../assets/img/snowAlb/snow_3.jpg'
import snow_4 from '../assets/img/snowAlb/snow_4.jpg'
import snow_5 from '../assets/img/snowAlb/snow_5.jpg'

import storm_1 from '../assets/img/stormAlb/storm_1.jpg'
import storm_2 from '../assets/img/stormAlb/storm_2.jpg'
import storm_3 from '../assets/img/stormAlb/storm_3.jpg'
import storm_4 from '../assets/img/stormAlb/storm_4.jpg'
import storm_5 from '../assets/img/stormAlb/storm_5.jpg'

import sunny_1 from '../assets/img/sunnyAlb/sunny_1.jpg'
import sunny_2 from '../assets/img/sunnyAlb/sunny_2.jpg'
import sunny_3 from '../assets/img/sunnyAlb/sunny_3.jpg'
import sunny_4 from '../assets/img/sunnyAlb/sunny_4.jpg'
import sunny_5 from '../assets/img/sunnyAlb/sunny_5.jpg'

const snowImages = [snow_1, snow_2, snow_3, snow_4, snow_5]
const stormImages = [storm_1, storm_2, storm_3, storm_4, storm_5]
const fogImages = [fog_1, fog_2, fog_3, fog_4, fog_5]
const cloudyImages = [cloudy_1, cloudy_2, cloudy_3, cloudy_4, cloudy_5]
const sunnyImages = [sunny_1, sunny_2, sunny_3, sunny_4, sunny_5]
const rainImages = [rain_1, rain_2, rain_3, rain_4, rain_5]

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export default function imgSelection(weatherData) {
  const randNum = getRandomArbitrary(0, 4)
  if (Object.keys(weatherData).length) {
    switch (weatherData.weather[0].main) {
      case 'Snow':
        return snowImages[randNum]
        break
      case 'Thunderstorm':
        return stormImages[randNum]
        break
      case 'Clear':
        return sunnyImages[randNum]
        break
      case 'Clouds':
        return cloudyImages[randNum]
        break
      case 'Rain':
        return rainImages[randNum]
        break
      case 'Drizzle':
        return rainImages[randNum]
        break
      case 'Fog':
        return fogImages[randNum]
        break
    }
  } else {
    return sunnyImages[randNum]
  }

}