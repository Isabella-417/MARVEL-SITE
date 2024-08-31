import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  Home  from "./pages/home/home";
import  Detail from "./pages/detail/detail";
import './App.css'
import Favorites from './pages/favorites';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/comic/:id/:name" element={<Detail/>}></Route>
      <Route path="/favorites" element={<Favorites/>}></Route>
    </Routes>
  </Router>)

}

export default App
