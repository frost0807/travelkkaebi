import 'bootstrap/dist/css/bootstrap.min.css';  // bootstrap css 적용
import ModalOnbtn from './components/ModalOnbtn';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Review from './pages/Review/Review';
import Footer from './components/Footer/Footer';

function Main () {
  return (

    <BrowserRouter>
    <Header/>
    {/* <ModalOnbtn /> */}
    <Routes>
    <Route path='/home' element={<Home /> } />  
    <Route path='/login' element={<Login /> } />
    <Route path='/register' element={<Register /> } />
    <Route path='/review' element={<Review /> } />  
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

function App() {
  return (
    <Main />
    );
}

export default App;
