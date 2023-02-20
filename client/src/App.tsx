import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Player } from "./pages/Player";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lol/summoners/:player" element={<Player />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
