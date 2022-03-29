import React from 'react'
import {IfCity} from '../hooks/ApiHooks'
import SmallCard from './SmallCard'

interface IfProps {
  city: IfCity
}

const City: React.FC<IfProps> = ({city}) => {
  const date = new Date(city.dt * 1000)
  const day = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
  const time = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })

  const precipitationCheck = () => {
    if (city.snow) {
      if (city.snow['1h'] !== undefined) {
        return {length: '1h', amount: city.snow['1h']}
      }

      if (city.snow['3h'] !== undefined) {
        return {length: '3h', amount: city.snow['3h']}
      }
    } else if (city.rain) {
      if (city.rain['1h'] !== undefined) {
        return {length: '1h', amount: city.rain['1h']}
      }
      if (city.rain['3h'] !== undefined) {
        return {length: '3h', amount: city.rain['3h']}
      }
    }
    return {length: '1h', amount: 0}
  }

  const precipitation = precipitationCheck()

  return (
    <div className="mainContainer">
      <div className="cardContainer">
        <div className="leftContainer">
          <div className="topLeft">
            <div className="cityName">{city.name}</div>
            <div className="weatherConditions">
              {city.weather[0].description}
            </div>
          </div>
          <div className="bottomLeft">
            <div className="day">{day}</div>
            <div className="time">{time}</div>
          </div>
        </div>
        <div className="rightContainer">
          <div className="topRight">
            <img
              className="weatherImg"
              src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            {Math.round(city.main.temp)} °C
          </div>
          <div className="bottomRight">
            <div>Wind: {city.wind.speed.toFixed(1)} m/s</div>
            <div>Humidity: {city.main.humidity}%</div>
            <div>
              Precipitation ({precipitation?.length}): {precipitation?.amount}mm
            </div>
          </div>
        </div>
      </div>
      <div className="smallCardsContainer">
        {city.list.slice(0, 5).map((el, i) => (
          <SmallCard
            key={i}
            dt={el.dt}
            main={el.main}
            weather={el.weather}
            wind={el.wind}
            snow={el.rain}
            rain={el.snow}
          />
        ))}
      </div>
    </div>
  )
}

export default City
