import 'bootstrap/dist/css/bootstrap.min.css';  // bootstrap css 적용
import ModalOnbtn from './components/ModalOnbtn';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Review from './pages/Review/Review';
import Footer from './components/Footer/Footer';
import ReviewDetail from './pages/Review/ReviewDetail';
import Contact from './pages/Contact/Contact';
import KakaoLogin from "./components/Login/KakaoLogin";

// test용 페이지 임포트 등
import TestPage from './pages/Test/TestPage';
import TestReview from './pages/Test/TestReview';
import TestReviewDetail from './pages/Test/TestReviewDetail';
import TestResponse from './pages/Test/TestResponse';
import TestPost from './pages/Test/TestPost';
import ReviewForm from './pages/Review/ReviewForm';


function Main() {
  return (
    <BrowserRouter>

    <Header/>

    <Routes>
    <Route path='/' element={<Home /> } />  
    <Route path='/login' element={<Login /> } />
    <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
    <Route path='/register' element={<Register /> } />
    <Route path='/contact' element={<Contact/>} />


    {/* Review Page */}
    <Route path='/review/:currentPage' element={<Review /> } />  
    <Route path='/review/detail/:id' element={<ReviewDetail />} />
    <Route path='/review/form' element={<ReviewForm />} />
    

    {/* test용 페이지*/}
    <Route path='/testpage' element={<TestPage/>} />
    <Route path='/testreview' element={<TestReview />} />
    <Route path='/testdetail/:id' element={<TestReviewDetail />}/>
    <Route path='/testresponse' element={<TestResponse />}/>
    {/* <Route path='/testpost' element={<TestPost />}/> */}


    </Routes>
    <Footer />

    </BrowserRouter>
  );
}

function App() {
  return <Main />;
}

export default App;
