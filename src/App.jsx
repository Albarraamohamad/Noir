import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoirIntro from "./components/Intro";
import './App.css'

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Prevent scrolling until intro is done
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [introFinished]);

  return (
    <BrowserRouter>
      {/* The Intro is on top (z-50). 
        When it finishes, it will slide UP, revealing the Routes below.
      */}
      {!introFinished && (
        <NoirIntro onFinish={() => setIntroFinished(true)} />
      )}

      <Routes>
        <Route path="/" element={<Home isVisible={introFinished} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;