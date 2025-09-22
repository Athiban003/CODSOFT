import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import JobDetail from "./components/JobDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedJobs from "./components/SavedJobs";
import HomeEmployer from "./components/HomeEmployer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup role={"candidate"} />} />
          <Route path="/login" element={<Login role={"candidate"} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/dashboard/saved-jobs" element={<SavedJobs />} />

          <Route path="/employer" element={<HomeEmployer />} />
          <Route
            path="/employer/signup"
            element={<Signup role={"employer"} />}
          />
          <Route path="/employer/login" element={<Login role={"employer"} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
