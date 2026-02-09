import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portal from './pages/Portal'
import NewYear from './pages/NewYear'
import Valentine from './pages/Valentine'
import RoseDay from './pages/RoseDay'
import ProposeDay from './pages/ProposeDay'
import ChocolateDay from './pages/ChocolateDay'

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
      </Routes>
    </Router>
  )
}

export default App
