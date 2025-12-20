import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoirIntro from "./components/Intro";
import './App.css'

const App = () => {
  const [showHero, setShowHero] = useState(false);

  return (
    <>
      {!showHero && <NoirIntro onFinish={() => setShowHero(true)} />}

      {showHero && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
      
    </>
  );
};

export default App;
