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
import JoinMe from "./pages/JoinMe/JoinMe";
import JoinMeDetail from "./pages/JoinMe/JoinMeDetail";
import JoinMeForm from "./pages/JoinMe/JoinMeForm";

function Main() {
  return (
    <BrowserRouter>
      <Header />
      {/* <ModalOnbtn /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/oauth/kakao/callback" element={<KakaoLogin />} />*/}
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} />
        <Route path="/reviewdetail/:id" element={<ReviewDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* test용 페이지*/}
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testreview" element={<TestReview />} />
        <Route path="/testdetail/:id" element={<TestReviewDetail />} />
        <Route path="/testresponse" element={<TestResponse />} />
        {/* <Route path='/testpost' element={<TestPost />}/> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinMe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/joinmedetail/:joinid" element={<JoinMeDetail />} />
        <Route path="/joinmeform" element={<JoinMeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
