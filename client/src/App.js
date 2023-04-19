import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Navbar from "./components/Navbar";

// PAGES
import Signin from './views/Signin';
import Home from './views/Home';
import Signup from './views/Signup';
import Stores from './views/Stores';
import ShowStore from './views/ShowStore';

function App() {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="App max-w-screen-2xl mx-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/signin' element={ !user ? <Signin /> : <Navigate to={'/'} /> }/>
          <Route path='/signup' element={ !user ? <Signup /> : <Navigate to={'/'} /> }/>
          <Route path='/stores' >
            <Route index element={ <Stores />} />
            <Route path=':id' element={ <ShowStore />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
