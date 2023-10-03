import logo from './logo.svg';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import { WeatherProvider } from './components/WeatherContext';
function App() {
  return (
   <>
     <WeatherProvider>
      <div className="App">
        <WeatherComponent />
      </div>
    </WeatherProvider>
   </>
  );
}

export default App;
