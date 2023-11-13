import React, { useState, useEffect } from 'react';
import { fetchEasyQuestions } from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const EasyQuiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uniqueToken = Date.now().toString();
        const easyQuestions = await fetchEasyQuestions(uniqueToken);
        setQuestions(easyQuestions);
        setCurrentQuestionIndex(0);
        setSelectedAnswers(Array(easyQuestions.length).fill(null));
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setQuizFinished(false);
        setShowResults(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('easyQuizAnswers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const shuffleAnswers = (currentQuestion) => {
    const answers = [...currentQuestion?.incorrect_answers, currentQuestion?.correct_answer];
    return answers.sort(() => Math.random() - 0.5);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestionIndex] = selectedAnswers[currentQuestionIndex];
        return newAnswers;
      });
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
      calculateResults();
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    calculateResults();
    setShowResults(true);
  };

  const returnToLevel = () => {
    navigate('/Level');
  };

  const restartQuiz = async () => {
    try {
      const uniqueToken = Date.now().toString();
      const easyQuestions = await fetchEasyQuestions(uniqueToken);
      setQuestions(easyQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers(Array(easyQuestions.length).fill(null));
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setQuizFinished(false);
      setShowResults(false);
    } catch (error) {
      console.error('Error restarting quiz:', error);
    }
  };

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((question, index) => {
      if (question.correct_answer === selectedAnswers[index]) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    setCorrectAnswers(correctCount);
    setIncorrectAnswers(incorrectCount);
  };

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = shuffleAnswers(currentQuestion);

  return (
    <div>
      {showResults ? (
        <>
          <p>¡Quizz finalizado!</p>
          <p>Respuestas Correctas: {correctAnswers}</p>
          <p>Respuestas Incorrectas: {incorrectAnswers}</p>
        </>
      ) : (
        <>
          <h2>Pregunta {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li key={index}>
                <button
                  onClick={() => handleAnswerSelection(answer)}
                  disabled={selectedAnswers[currentQuestionIndex] !== null}
                  style={{
                    backgroundColor:
                      answer === selectedAnswers[currentQuestionIndex]
                        ? answer === currentQuestion.correct_answer
                          ? 'green'
                          : 'red'
                        : '',
                  }}
                >
                  {answer}
                </button>
              </li>
            ))}
          </ul>
          {selectedAnswers[currentQuestionIndex] !== null && (
            <p>Respuesta Correcta: {currentQuestion.correct_answer}</p>
          )}
        </>
      )}

      <div>
        {quizFinished && (
          <>
            <button onClick={restartQuiz}>Reiniciar Quizz</button>
            <button onClick={returnToLevel}>Regresar a Level</button>
          </>
        )}

        {!showResults && (
          <>
            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Anterior
            </button>
            <button onClick={nextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar Quizz' : 'Siguiente'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EasyQuiz;
