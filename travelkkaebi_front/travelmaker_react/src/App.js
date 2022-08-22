import ModalOnbtn from './components/ModalOnbtn';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register';
import Login from './components/Login/Login';


function Main () {
  return (

    <BrowserRouter>
    <ModalOnbtn />
    <Routes>
    <Route path='/login' element={<Login /> } />
    <Route path='/register' element={<Register /> } />
    </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Main />
    );
}

export default App;
