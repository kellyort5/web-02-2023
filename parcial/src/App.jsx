import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/components/Home/Home';
import QuizConfig from './assets/components/Questions/QuizConfig';
import QuestionList from './assets/components/Questions/QuestionList';
import { QuizzSaved } from "./assets/components/Quizz/QuizzSaved";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Quizzes" element={<QuizConfig/>} />
          <Route path="/questions" element={<QuestionList/>} />
          <Route path="/quizzSaved" element={<QuizzSaved/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
