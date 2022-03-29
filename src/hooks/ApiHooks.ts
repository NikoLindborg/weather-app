import {useState, useEffect} from 'react'
import {doFetch} from '../utils/http'
import {baseUrl, cityIds} from '../utils/variables'
import {REACT_APP_API_KEY} from '../environment'

export interface IfCity {
  weather: [
    {
      main: string
      description: string
      icon: string
    }
  ]
  name: string
  dt: number
  main: {
    temp: number
    humidity: number
  }
  wind: {
    speed: number
  }
  snow?: {
    '1h'?: number
    '3h'?: number
  }
  rain?: {
    '1h'?: number
    '3h'?: number
  }
  list: IfList[]
}

export interface IfList {
  dt: number
  main: {
    temp: number
    humidity: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  wind: {
    speed: number
  }
  snow?: {
    '1h'?: number
    '3h'?: number
  }
  rain?: {
    '1h'?: number
    '3h'?: number
  }
}

const useWeather = () => {
  const [cities, setCities] = useState<IfCity[]>([])

  useEffect(() => {
    ;(async () => {
      const cityList = await getAllWeatherData()
      setCities(cityList)
    })()
  }, [])

  const getAllWeatherData = async (): Promise<IfCity[]> => {
    const cityList = cityIds.map(async (cityId) => {
      try {
        const forecastData = await doFetch(
          // eslint-disable-next-line max-len
          `${baseUrl}data/2.5/forecast?id=${cityId}&units=metric&appid=${REACT_APP_API_KEY}`
        )

        const weatherData = await doFetch(
          // eslint-disable-next-line max-len
          `${baseUrl}data/2.5/weather?id=${cityId}&units=metric&appid=${REACT_APP_API_KEY}`
        )
        const allData = <IfCity>{
          weather: [
            {
              main: weatherData.weather[0].main,
              description: weatherData.weather[0].description,
              icon: weatherData.weather[0].icon,
            },
          ],
          name: weatherData.name,
          dt: weatherData.dt,
          main: {
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
          },
          wind: {
            speed: weatherData.wind.speed,
          },
        }

        allData.list = forecastData.list
        if (weatherData.rain) {
          allData.rain = weatherData.rain
        }
        if (weatherData.snow) {
          allData.snow = weatherData.snow
        }
        return allData
      } catch (error) {
        console.error('error', error)
      }
    })
    const results = await Promise.all(cityList)
    return results?.filter((city): city is IfCity => city !== undefined)
  }
  return {cities}
}

export {useWeather}
