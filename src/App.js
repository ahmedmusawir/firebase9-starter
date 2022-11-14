import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainNavbar from "./components/general/MainNavbar";
import EditPostPage from "./pages/EditPostPage";
import SamplePage from "./pages/SamplePage";
import AddPostPage from "./pages/AddPost";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import QueryPage from "./pages/QueryPage";
import ThemeSelector from "./components/general/ThemeSelector";
import { useTheme } from "./hooks/useTheme";
import PaginationPage from "./pages/PaginationPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.scss";

function App() {
  const { mode } = useTheme();
  const { user, authIsReady } = useAuthContext();

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          <MainNavbar />
          <ThemeSelector />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/query" element={<QueryPage />} />
            <Route path="/post/:id" element={<SinglePostPage />} />
            {user && <Route path="/add-post/" element={<AddPostPage />} />}
            {user && <Route path="/edit-post/:id" element={<EditPostPage />} />}
            <Route path="/sample-page" element={<SamplePage />} />
            <Route path="/pagination" element={<PaginationPage />} />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignupPage />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
