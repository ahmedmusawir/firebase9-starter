import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainNavbar from "./components/general/MainNavbar";
import EditPostPage from "./pages/EditPostPage";
import SamplePage from "./pages/SamplePage";
import AddPostPage from "./pages/AddPost";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<SinglePostPage />} />
          <Route path="/add-post/" element={<AddPostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/sample-page" element={<SamplePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
