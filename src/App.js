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
          <div className="font-bold select-none">Todo List</div>
          <div className="flex-1 flex justify-end">
            {location.pathname == "/main" && (
              <NavLink to="/write" className="select-none">
                Add Todo
              </NavLink>
            )}
            {location.pathname != "/main" && (
              <span to="/main" className="select-none" onClick={(() => navigate(-1))}>
                List
              </span>
            )}
          </div>
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
