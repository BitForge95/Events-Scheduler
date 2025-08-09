import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Read } from './components/Read';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/read" element={<Read/>}/>
      </Routes>
    </div>
  );
}

export default App;
