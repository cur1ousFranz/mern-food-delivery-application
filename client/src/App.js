import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Navbar from "./components/Navbar";

// PAGES
import Signin from './views/Signin';
import Home from './views/Home';
import Signup from './views/Signup';
import Menu from './views/Menu';

function App() {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/signin' element={ !user ? <Signin /> : <Navigate to={'/'} /> }/>
          <Route path='/signup' element={ !user ? <Signup /> : <Navigate to={'/'} /> }/>
          <Route path='/menu' element={ <Menu />}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
