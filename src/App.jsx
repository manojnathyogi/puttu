import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portal from './pages/Portal'
import NewYear from './pages/NewYear'
import Valentine from './pages/Valentine'
import RoseDay from './pages/RoseDay'
import ProposeDay from './pages/ProposeDay'
import ChocolateDay from './pages/ChocolateDay'
import TeddyDay from './pages/TeddyDay'
import PromiseDay from './pages/PromiseDay'
import HugDay from './pages/HugDay'
import KissDay from './pages/KissDay'

function App() {
  return (
    <Router basename="/puttu">
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/newyear" element={<NewYear />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/rose-day" element={<RoseDay />} />
        <Route path="/propose-day" element={<ProposeDay />} />
        <Route path="/chocolate-day" element={<ChocolateDay />} />
        <Route path="/teddy-day" element={<TeddyDay />} />
        <Route path="/promise-day" element={<PromiseDay />} />
        <Route path="/hug-day" element={<HugDay />} />
        <Route path="/kiss-day" element={<KissDay />} />
      </Routes>
    </Router>
  )
}

export default App
