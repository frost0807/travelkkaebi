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

import RegionEventCreateForm from "./pages/RegionEvent/RegionEventCreateForm";
import RegionEventDetail from "./pages/RegionEvent/RegionEventDetail";

import JoinMe from "./pages/JoinMe/JoinMe";
import JoinMeDetail from "./pages/JoinMe/JoinMeDetail";
import JoinMeForm from "./pages/JoinMe/JoinMeForm";
import JoinMeCard from "./pages/JoinMe/JoinMeCard";
import { useRecoilState } from "recoil";
import { isLoginState, showJoinMeDetailState } from "./recoil/atom";
import JoinMeEditForm from "./pages/JoinMe/JoinMeEditForm";
import Editor from "./pages/Editor/Editor";
import EditorDetail from "./pages/Editor/EditorDetail";
import EditorCreateForm from "./pages/Editor/EditorCreateForm";

import PickUpMeDetail from "./pages/PickUpMe/PickUpMeDetail";
import PickUpMeForm from "./pages/PickUpMe/PickUpMeForm";
import PickUpMeEditForm from "./pages/PickUpMe/PickUpMeEditForm";
import JoinApplyList from "./pages/MyPage/JoinApply/JoinApplyList";

import MyTravel from "./pages/MyTravel/MyTravel";
import MytravelDetail from "./pages/MyTravel/MyTravelDetail";
import MyTravelDetail from "./pages/MyTravel/MyTravelDetail";
import MyTravelListElement from "./pages/MyTravel/MyTravelListElement";
import JoinMyApplyList from "./pages/MyPage/JoinApply/JoinMyApplyList";
import JoinApplyUserList from "./pages/MyPage/JoinApply/JoinApplyUserList";
import PickApplyList from "./pages/MyPage/PickApply/PickApplyList";
import PickMyApplyList from "./pages/MyPage/PickApply/PickMyApplyList";
import PickApplyUserList from "./pages/MyPage/PickApply/PickApplyUserList";
import { MyPage } from "./pages/MyPage/MyPage";

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" index element={<Home />} />
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

        {/* Editor Page */}
        <Route path="/editor/:currentPage" element={<Editor />} />
        <Route path="/editor/detail/:id" element={<EditorDetail />} />
        <Route path="/editor/createform" element={<EditorCreateForm />} />

        {/* RegionEvent Page */}
        <Route path="/regionevent" element={<RegionEvent />} />
        <Route
          path="/regionevent/createform"
          element={<RegionEventCreateForm />}
        />
        <Route path="/regionevent/detail/:id" element={<RegionEventDetail />} />

        {/* test용 페이지*/}
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/testreview" element={<TestReview />} />
        <Route path="/testdetail/:id" element={<TestReviewDetail />} />
        <Route path="/testresponse" element={<TestResponse />} />
        <Route path="/testpost" element={<TestPost />} />

        <Route path="/joinme/:pageNo" element={<JoinMe />} />
        <Route path="/joinme/:pageNo/item/:id" element={<JoinMeDetail />} />
        <Route path="/joinmeform" element={<JoinMeForm />} />
        <Route path="joinmeedit" element={<JoinMeEditForm />} />

        <Route path="/pickme/:pageNo" element={<PickUpMe />} />
        <Route path="/pickme/:pageNo/item/:id" element={<PickUpMeDetail />} />
        <Route path="/pickmeform" element={<PickUpMeForm />} />
        <Route path="pickmeedit" element={<PickUpMeEditForm />} />
      </Routes>

      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        {/** 내가 신청한 게시글 보기 */}
        <Route path="/mypage/apply/list" element={<JoinApplyList />} />
        {/** 나의 게시글 보기 */}
        <Route path="/mypage/myapply/list" element={<JoinMyApplyList />} />
        <Route
          path="/mypage/myapply/list/appliction"
          element={<JoinApplyUserList />}
        />

        <Route path="/mypage/pickmeapply/list" element={<PickApplyList />} />
        <Route
          path="/mypage/pickmemyapply/list"
          element={<PickMyApplyList />}
        />
        <Route
          path="/mypage/pickmemyapply/list/appliction"
          element={<PickApplyUserList />}
        />
      </Routes>

      <Routes>
        <Route path="/mytravel/:pageNo" element={<MyTravel />} />
        <Route path="/mytraveldetail" element={<MyTravelDetail />} />
      </Routes>

      {/* //=================================== */}
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return <Main />;
}

export default App;
