import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/layouts/Navbar';
import Signin from './views/auth/Signin';
import Home from './views/pages/Home';
import Store from './views/pages/Store';

function App() {
  const { store } = useContext(AuthContext)

  return (
    <div className="App max-w-screen-2xl mx-auto">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={!store ? <Home /> : <Navigate to={'/store'} />}/>
          <Route path='/signin' element={ !store ? <Signin /> : <Navigate to={'/store'} />}/>
          <Route path='/store' element={ store ? <Store /> : <Navigate to={'/signin'} />}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
