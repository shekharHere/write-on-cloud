import './App.css';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NoteState from './Context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
