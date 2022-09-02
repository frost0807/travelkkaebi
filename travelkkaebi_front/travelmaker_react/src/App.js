import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap css 적용

// import ModalOnbtn from "./components/ModalOnbtn";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Review from "./pages/Review/Review";
import Footer from "./components/Footer/Footer";
import ReviewDetail from "./pages/Review/ReviewDetail";
import Contact from "./pages/Contact/Contact";

// test용 페이지 임포트 등
import TestPage from "./pages/Test/TestPage";
import TestReview from "./pages/Test/TestReview";
import TestReviewDetail from "./pages/Test/TestReviewDetail";
import TestResponse from "./pages/Test/TestResponse";

import TestPost from "./pages/Test/TestPost";
import ReviewForm from './pages/Review/ReviewForm';
import RegionEvent from "./pages/RegionEvent/RegionEvent";
import PickUpMe from"./pages/PickUpMe/PickUpMe";


import JoinMe from "./pages/JoinMe/JoinMe";
import JoinMeDetail from "./pages/JoinMe/JoinMeDetail";
import JoinMeForm from "./pages/JoinMe/JoinMeForm";


function Main() {
  return (
    <BrowserRouter>
      <Header />
      {/* <ModalOnbtn /> */}




      {/* //=================================== */}
      <Routes>
        <Route 
        // path="/"
        index
         element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/*<Route path="/oauth/kakao/callback" element={<KakaoLogin />} />*/}

        <Route path="/register" element={<Register />} />
        <Route path="/review/:currentPage" element={<Review />} />
        <Route path="/reviewdetail/:id" element={<ReviewDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* Review Page */}
        <Route path='/review/:currentPage' element={<Review />}/>
        <Route path='/review/detail/:id' element={<ReviewDetail/>}/>
        <Route path='/review/form' element={<ReviewForm />}/>

        {/* RegionEvent Page */}
        <Route path="/regionevent" element={<RegionEvent />}/>


        {/* test용 페이지*/}
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testreview" element={<TestReview />} />
        <Route path="/testdetail/:id" element={<TestReviewDetail />} />
        <Route path="/testresponse" element={<TestResponse />} />
        {/* <Route path='/testpost' element={<TestPost />}/> */}

        <Route path="/pickupme" element={<PickUpMe />}/>
      </Routes>



      {/* //=================================== */}
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <Main/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<JoinMe />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/joinmedetail/:joinid" element={<JoinMeDetail />} />
    //     <Route path="/joinmeform" element={<JoinMeForm />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
