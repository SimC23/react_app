import React, {useState} from 'react';

import './App.css';

const api = {
  key: 'f16f0e4ca6c138b0eba6a4fb74e16fd7',
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {

  const[query,setQuery] = useState('')
  const[weather,setWeather] = useState({})


const search = e => {
  if(e.key ==='Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    //first then is called a promise res stands for response we use the json to get the actual data
    .then(res=>res.json())
    .then(result => {
      //basically here the first then returns an object the second then will take that object and use it as an argument for the other functions below!!!
      setWeather(result)
      setQuery('')
      console.log(result)
    })
  }
}


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date= d.getDate(); //returns a number between 1-31
    let month= months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`
  
  
  }
  
  return (
    <div className={(typeof weather.main !='undefined') ? ((weather.main.temp> 16) ? 'App warm' : 'App') : 'App'}>
      <main>
      <div className ='search-box'>
        <input type='text' className='search-bar' placeholder='search city' onChange={(e)=>setQuery(e.target.value)}
        value={query}
        //if you presss the enter key it will triger it 
        onKeyPress={search}
        >
        </input>
      </div>
      {(typeof weather.main !='undefined') ? (
        <div>
         <div className='location-box'>
         <div className='location'>{weather.name}</div>
         <div className='date'> {dateBuilder(new Date())} </div>
       </div>
       <div className='weather-box'>
       <div className='temp'> 
       {Math.round(weather.main.temp)}
       </div>
       <div className='weather'>{weather.weather[0].main}</div>
       </div>
       </div>
      ) : ('') }
      </main>
    </div>
  );
}

export default App;
