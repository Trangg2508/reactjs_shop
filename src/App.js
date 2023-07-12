
import './App.css';
import DetailPro from './pages/DetailPro';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'
import Footer from './components/Footer';
import Categories from './pages/Categories';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import LoveList from './pages/LoveList';
import Contact from './pages/Contact';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <Nav/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/detail/:id' element={<DetailPro/>}></Route>
      <Route path='/category' element={<Categories/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
      <Route path='/cate/:type' element={<Categories/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/love' element={<LoveList/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
<Route path='/profile' element={<Profile/>}></Route>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
