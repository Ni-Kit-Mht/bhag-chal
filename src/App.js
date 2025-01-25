import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingRoom from './WaitingRoom';
import Game from './Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WaitingRoom />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;