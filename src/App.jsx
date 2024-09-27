import axios from 'axios'
import React, { useState } from 'react'

function App() {
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)

  const [weatherData, setWeatherData] = useState(null)

  const [location, setLocation] = useState("")
  const API_KEY = '52f0e5da9c2cba7b61bf9906f5b26ef4'
  // date
  const date = new Date()
  // formatted date
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
// Handling weather API
  const searchWeatherAPI = async () => {
    try {
      setError(false)
      setLoader(true)
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
      setWeatherData(data)
      console.log(data)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      setError(true)
      console.log(error)
    }
  }

  return (
   <>
   <main className='flex flex-col gap-4 mt-12 justify-center items-center mx-auto'>
   <div className='my-8'>
      <h1 className='text-4xl font-bold text-center'>Weather Application in ReactJS</h1>
    </div>

    <div className='space-x-2'>
      <input
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      className='py-2 px-4 rounded-md outline-none w-[400px] focus:ring-2 focus:ring-blue-700 text-gray-900'
      type="text" placeholder='Enter City' />
      <button
      onClick={() => searchWeatherAPI()}
      className='py-2 px-4 rounded-md outline-none bg-pink-600 hover:bg-pink-800'
      >Get Weather</button>
    </div>

    {/* Result */}
    <div className='flex flex-col gap-4 w-[700px] bg-gray-900 p-8 rounded-xl'>
   {
    loader && (
      <div>
        <h1 className='text-xl text-center font-bold text-white'>Loading...</h1>
      </div>
    )
   }

{
    error && (
      <div>
        <h1 className='text-xl text-center font-bold text-white'>Something went wrong, please try again...</h1>
      </div>
    )
   }

   {
    !loader && !error && weatherData && (
      <div className='flex flex-col gap-2'>
       
       <div className='p-4 rounded-xl bg-gray-200 mb-12'>
       <h1 className='text-xl text-center font-bold text-gray-900 flex flex-col gap-4'>{formattedDate}</h1>

<h1 className='text-xl text-center font-bold text-gray-900 rounded-lg py-4 px-2 '>{weatherData.name}, {weatherData.sys.country}
<br />

</h1>
       </div>

        <div>
        <span className='mt-8 text-2xl font-bold'>
          Temprature: {weatherData.main.temp} C
        </span>
        <br />
        <span className='flex gap-2 items-center text-2xl font-bold'>
         <h1> Situation: {weatherData.weather[0].description}</h1>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
        </span>
        <span className='flex gap-2 items-center text-2xl font-bold'>
         <h1> Wind: {weatherData.wind.speed} m/s</h1>
         
        </span>
        
        </div>

        

      </div>
    )
   }

   {
    !loader && !error && !weatherData && (
      <h1 className='text-xl text-center font-bold text-white'>No Data</h1>
    )
   }
    </div>
   </main>

    
   </>
  )
}

export default App
