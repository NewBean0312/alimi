import { AppBar, Toolbar } from "@mui/material";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import EditPage from "./pages/EditPage";
import { NoticeSnackbar } from "./components/NoticeSnackbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            to="/main"
            className="self-stretch flex items-center mr-auto font-bold select-none"
          >
            알리미
          </NavLink>
          {/* main 화면 시 */}
          {location.pathname == "/main" && (
            <NavLink
              to="/write"
              className="select-none self-stretch flex items-center"
            >
              추가
            </NavLink>
          )}
          {/* main 화면이 아닐 시 */}
          {location.pathname != "/main" && (
            <span
              to="/main"
              className="flex items-center select-none self-stretch cursor-pointer"
              onClick={() => navigate(-1)}
            >
              리스트
            </span>
          )}
        </Toolbar>
      </AppBar>
      <NoticeSnackbar />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default App;
