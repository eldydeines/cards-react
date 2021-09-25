import DrawOne from './DrawOne';
import ContinuousDrawing from './ContinuousDrawing';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      <p>----Part One-----</p>
      <DrawOne />
      <p>----Part Two-----</p>
      <ContinuousDrawing />
    </div>
  );
}

export default App;
