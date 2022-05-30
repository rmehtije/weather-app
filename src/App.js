import logo from './logo.svg';
import WeatherComponent from './CurrentWeather';
import VComponent from './VComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherComponent />
    
        <VComponent firstName='Rasim' lastName='Mehtijev'/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
