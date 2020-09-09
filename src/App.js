import React, { useRef } from "react";
import logo from './logo.svg';
import './App.css';
import FoodTruckContainer from './FoodTruckContainer';

function App() {

  const innerRef = useRef();

    const getLocation = () => {
        innerRef.current && innerRef.current.getLocation();
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p></p>
        <FoodTruckContainer onError={(error) => console.log(error)} ref={innerRef} />
            <button
                className="pure-button pure-button-primary"
                onClick={getLocation}
                type="button"
            >
                Get location
            </button>

            
      </header>
    </div>
  );
}

export default App;
