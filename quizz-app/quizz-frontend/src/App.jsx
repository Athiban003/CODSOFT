import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Quiz from "./component/Quiz";
import CreateQuiz from "./component/CreateQuiz";
import ProtectedRoute from "./component/ProtectedRoute";
import PlayQuiz from "./component/PlayQuiz";
import QuizResult from "./component/QuizResult";
import ReviewQuiz from "./component/ReviewQuiz";
import Navigation from "./component/Navigation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/quizzes"
            element={
              <ProtectedRoute>
                <Quiz />
                <Navigation />
              </ProtectedRoute>
            }
          />
          <Route path="/quizzes/:id" element={<PlayQuiz />} />
          <Route path="/quizzes/create" element={<CreateQuiz />} />
          <Route path="/quizzes/result" element={<QuizResult />} />
          <Route path="/quizzes/result/review" element={<ReviewQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
