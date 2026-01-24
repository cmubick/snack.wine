import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Spritzers from './pages/Spritzers'
import Trade from './pages/Trade'
import Waitlist from './pages/Waitlist'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/spritzers" element={<Spritzers />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/waitlist" element={<Waitlist />} />
      </Route>
    </Routes>
  )
}

export default App
