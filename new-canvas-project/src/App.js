
import './App.css';
import {useState} from 'react';
import Canvas from './components/Canvas.js';
function App() {
  const [isVisible,setVisibility] = useState(true);
  const unmount = ()=>{
    setVisibility(!isVisible);

  }
  return (
    <div className="App">
      <h1>Canvas</h1>
      <button className="button" onClick={unmount}>Toggle Unmount</button>
     {isVisible && <Canvas/>}
    </div>
  );
}

export default App;
