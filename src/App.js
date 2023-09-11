import { AppBar, Toolbar } from "@mui/material";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import NoticeSnackbar from "./components/NoticeSnackbar";

function App() {
  const location = useLocation();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className="flex-1"></div>
          <div className="font-bold select-none">HAPPY NOTE</div>
          <div className="flex-1 flex justify-end">
            {location.pathname != "/write" && (
              <NavLink to="/write" className="select-none">
                Write
              </NavLink>
            )}
            {location.pathname == "/write" && (
              <NavLink to="/main" className="select-none">
                이전
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
