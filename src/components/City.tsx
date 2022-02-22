import React, { useEffect } from 'react'
import { IfCity } from '../hooks/ApiHooks'
import SmallCard from './SmallCard'

const City: React.FC<IfCity> = ({
  weather,
  name,
  dt,
  main,
  list,
  wind,
  snow,
  rain,
}) => {
  const date = new Date(dt * 1000)
  const day = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
  const time = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })
  const precipitationCheck = () => {
    if (snow) {
      if (snow['1h'] !== undefined) {
        return { length: '1h', amount: snow['1h'] }
      }

      if (snow['3h'] !== undefined) {
        return { length: '3h', amount: snow['3h'] }
      }
    } else if (rain) {
      if (rain['1h'] !== undefined) {
        return { length: '1h', amount: rain['1h'] }
      }
      if (rain['3h'] !== undefined) {
        return { length: '3h', amount: rain['3h'] }
      }
    }
    return { length: '1h', amount: 0 }
  }
  const precipitation = precipitationCheck()

  return (
    <div className="mainContainer">
      <div className="cardContainer">
        <div className="leftContainer">
          <div className="topLeft">
            <div className="cityName">{name}</div>
            <div className="weatherConditions">{weather[0].description}</div>
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
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            {Math.round(main.temp)} °C
          </div>
          <div className="bottomRight">
            <div>Wind: {wind.speed.toFixed(1)} m/s</div>
            <div>Humidity: {main.humidity}%</div>
            <div>
              Precipitation ({precipitation?.length}): {precipitation?.amount}mm
            </div>
          </div>
        </div>
      </div>
      <div className="smallCardsContainer">
        {list.slice(0, 5).map((el, i) => (
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
