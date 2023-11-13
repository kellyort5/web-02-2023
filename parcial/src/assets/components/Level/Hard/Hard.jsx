import React, { useState, useEffect } from 'react';
import { fetchHardQuestions } from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const HardQuiz = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedQuestions = localStorage.getItem('hardQuizQuestions');
        if (storedQuestions) {
          const storedIndex = localStorage.getItem('hardQuizIndex');
          setQuestions(JSON.parse(storedQuestions));
          setCurrentQuestionIndex(storedIndex ? parseInt(storedIndex, 10) : 0);
        } else {
          const uniqueToken = Date.now().toString();
          const hardQuestions = await fetchHardQuestions(uniqueToken);
          setQuestions(hardQuestions);
          localStorage.setItem('hardQuizQuestions', JSON.stringify(hardQuestions));
          localStorage.setItem('hardQuizIndex', '0');
        }

        const storedAnswers = localStorage.getItem('hardQuizAnswers');
        if (storedAnswers) {
          setSelectedAnswers(JSON.parse(storedAnswers));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('hardQuizAnswers', JSON.stringify(selectedAnswers));
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
  };

  const returnToLevel = () => {
    navigate('/Level');
  };

  const restartQuiz = () => {
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(10).fill(null));
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

  return (
    <div>
      {quizFinished ? (
        <>
          <p>¡Quizz finalizado!</p>
          <p>Respuestas Correctas: {correctAnswers}</p>
          <p>Respuestas Incorrectas: {incorrectAnswers}</p>
          <button onClick={restartQuiz}>Reiniciar Quizz</button>
          <button onClick={returnToLevel}>Regresar a Level</button>
        </>
      ) : (
        <>
          <h2>Pregunta {currentQuestionIndex + 1}</h2>
          {questions.length > 0 && currentQuestionIndex < questions.length && (
            <>
              <p>{questions[currentQuestionIndex]?.question}</p>
              <ul>
                {shuffleAnswers(questions[currentQuestionIndex]).map((answer, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAnswerSelection(answer)}
                      disabled={selectedAnswers[currentQuestionIndex] !== null}
                      style={{
                        backgroundColor:
                          answer === selectedAnswers[currentQuestionIndex]
                            ? answer === questions[currentQuestionIndex]?.correct_answer
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
                <p>Respuesta Correcta: {questions[currentQuestionIndex]?.correct_answer}</p>
              )}
              <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
                Anterior
              </button>
              <button onClick={nextQuestion}>
                {currentQuestionIndex === questions.length - 1 ? 'Finalizar Quizz' : 'Siguiente'}
              </button>
            </>
          )}
          {questions.length === 0 && <p>Cargando preguntas...</p>}
          {questions.length === 0 && <p>Error al cargar preguntas.</p>}
        </>
      )}
    </div>
  );
};

export default HardQuiz;
