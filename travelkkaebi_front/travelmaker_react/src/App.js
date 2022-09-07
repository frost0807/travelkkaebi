import "bootstrap/dist/css/bootstrap.min.css"; // bootstrap css 적용
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Review from "./pages/Review/Review";
import Footer from "./components/Footer/Footer";
import ReviewDetail from "./pages/Review/ReviewDetail";
import Contact from "./pages/Contact/Contact";
import RegionEventCreateForm from "./pages/RegionEvent/RegionEventCreateForm";

// test용 페이지 임포트 등
import TestPage from "./pages/Test/TestPage";
import TestReview from "./pages/Test/TestReview";
import TestReviewDetail from "./pages/Test/TestReviewDetail";
import TestResponse from "./pages/Test/TestResponse";

import TestPost from "./pages/Test/TestPost";
import ReviewUpdateForm from "./pages/Review/ReviewUpdateForm";
import ReviewCreateForm from "./pages/Review/ReviewCreateForm";
import RegionEvent from "./pages/RegionEvent/RegionEvent";
import PickUpMe from "./pages/PickUpMe/PickUpMe";

import JoinMe from "./pages/JoinMe/JoinMe";
import JoinMeDetail from "./pages/JoinMe/JoinMeDetail";
import JoinMeForm from "./pages/JoinMe/JoinMeForm";
import JoinMeCard from "./pages/JoinMe/JoinMeCard";
import { useRecoilState } from "recoil";
import { isLoginState, showJoinMeDetailState } from "./recoil/atom";

function Main() {
  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/review/:currentPage" element={<Review />} />
        <Route path="/review/detail/:id" element={<ReviewDetail />} />
        <Route path="/review/createform" element={<ReviewCreateForm />} />

        {/* RegionEvent Page */}
        <Route path="/regionevent" element={<RegionEvent />} />
        <Route path="/regionevent/createform" element={<RegionEventCreateForm />} />

        {/* test용 페이지*/}
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testreview" element={<TestReview />} />
        <Route path="/testdetail/:id" element={<TestReviewDetail />} />
        <Route path="/testresponse" element={<TestResponse />} />
        {/* <Route path='/testpost' element={<TestPost />}/> */}

        <Route path="/joinme/:pageNo" element={<JoinMe />} />
        <Route path="/joinme/:page/:joinme_id" element={<JoinMeDetail />} />
        <Route path="/joinmeform" element={<JoinMeForm />} />
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
