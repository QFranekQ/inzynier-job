import './App.css';
import Cards from './components/Cards';
import Cards2 from './components/Cards2';
import Cardsnew from './components/Cardsnew';
import CardsShow from './components/CardsShow';
import Header from './components/Header';
import Login from './components/Login';
import SpeachSynth from './components/SpeachSynth';
import { Link } from 'react-router-dom';


import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import UserPage from './components/UserPage';
import Tasks from './components/Tasks';
import EditCards from './components/EditCards';
import MainPage from './components/MainPage';

function App() {
  return (
 
    <div className="App">
    <Router>
    <Header />

      <Routes>
        
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/translate" element={<Cards />} />
        <Route path="/cards" element={<CardsShow />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/edit" element={<EditCards />} />


      </Routes>
    </Router>
    {/* <EditCards /> */}
    {/* <Tasks /> */}
      {/* <Link to="/Header">Resume</Link>
      <Link to="/Cards">About Me</Link>
      <Link to="/Projects">Projects</Link>
      <Link to="/Contact">Contact</Link> */}
    {/* <Header />
    <Cards /> */}
  </div>
  
    );
}

export default App;
