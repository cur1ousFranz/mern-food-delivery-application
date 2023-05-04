import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Navbar from "./components/layouts/Navbar";

// PAGES
import Signin from './views/auth/Signin';
import Signup from './views/auth/Signup';
import Home from './views/pages/Home';
import ShowStore from './views/pages/ShowStore';
import Checkout from './views/pages/Checkout';
import Footer from './components/layouts/Footer';
import Profile from './views/customer/Profile';
import Orders from './views/customer/Orders';

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
            <Route path=':id' element={ <ShowStore />} />
          </Route>
          <Route path='/checkout' element={ <Checkout /> }/>
          <Route path='/profile' element={ user ? <Profile /> : <Navigate to={'/signin'} />  }/>
          <Route path='/orders' element={ user ? <Orders /> : <Navigate to={'/signin'} />  }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
