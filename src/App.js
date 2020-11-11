
import React,{useState} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import './App.css';




function App() {
 const[query, setQuery]=  useState('');
 const[weather, setWeather]=  useState('');
 const api  = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_KEY}`;
 const dateToFormat = new Date();
 const search = evt => {
    if (evt.key === "Enter") {
      fetch(api)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
 

  return (
    <div className="container">
  <div className={(typeof weather.main != "undefined")
   ? ((weather.main.temp > 21) 
   ? 'app-warm' : 'app') : 'app'}>
    <main>
    
          <div className="Search-bar">
               <input type="text" className="Search-box" 
                placeholder="Search for location and Press enter " 
                onChange={e=>setQuery(e.target.value)}
                value={query}
                onKeyPress={search}/>
     
          </div>      
          {(typeof weather.main != "undefined") ? (
            <div>
          <div className="location-box">
          <div className="location">{weather.name} , {weather.sys.country}</div>
          <div className="date"> <p><Moment format="DD/MM/YYYY HH:mm" date={dateToFormat} /></p></div>
         </div>
          <div className="weather-box">
          <div className="temp">
          {Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
        
      
          ) : ('')}
          
     </main>
    </div>
    </div>
  );
}


export default App;
